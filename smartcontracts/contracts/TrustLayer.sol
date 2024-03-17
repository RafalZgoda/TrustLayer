// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC20 {
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function approve(address spender, uint256 value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function mint(address to, uint256 amount) external;
}

contract TrustLayer is Ownable {

    struct Member {
        mapping(address => bool) trustedMembers;
        mapping(address => uint256) trustedAmount;
        address[] trustingMembers;
        bool isMember;
        address mainWallet;
        Loan[] loans;

    }

    struct Loan {
        address lender;
        address token;
        uint256 amount;
        bool paidBack;
    }

    uint256 public constant BORROW_LIMIT_PERCENT = 50;
    uint256 public memberCount = 0;
    mapping(address => Member) public members;
    mapping(address => mapping(string => uint)) public trustUncreatedAccount;
    
    constructor() Ownable(msg.sender) {
        addMember(msg.sender);

    }

    // Add a member
    function addMember(address _mainWallet) public onlyOwner {
        require(!members[_mainWallet].isMember, "This address is already a member.");
        members[_mainWallet].isMember = true;
        members[_mainWallet].mainWallet = _mainWallet;
        memberCount++;
    }

    // Set trust between members
    function setTrust(address _member, uint256 _amount) external {
        require(members[msg.sender].isMember, "You must be a member.");
        require(members[_member].isMember, "The recipient must be a member.");

        if (_amount > 0) {
            _setTrust(_member, _amount);
        } else {
            _removeTrust(_member);
        }
    }

    function setTrustUncreatedAccount(string memory _account, uint _amount) public {
        trustUncreatedAccount[msg.sender][_account] = _amount; 
        members[msg.sender].isMember = true;
        members[msg.sender].mainWallet = msg.sender;
        memberCount++;
    }

    // Calculate the maximum borrowable amount or the trust level 
    function getMaxBorrowable(address _borrower, address _lender, address _token) public view returns (uint256) {
        uint256 lenderBalance = IERC20(_token).balanceOf(_lender);
        uint256 allowance = IERC20(_token).allowance(_lender, address(this));
        uint256 trustedAmount = members[_lender].trustedAmount[_borrower];

        return (min(min(lenderBalance, allowance), trustedAmount) * BORROW_LIMIT_PERCENT) / 100;
    }

    // Borrow an amount
    function borrow(address _token, uint256 _amount) external {
        require(members[msg.sender].isMember, "You must be a member to borrow.");

        uint256 totalBorrowed = 0;
        IERC20(_token).mint(_amount); 

        return; 
        for (uint256 i = 0; i < members[msg.sender].trustingMembers.length; i++) {
            address lender = members[msg.sender].trustingMembers[i];
            uint256 maxBorrowable = getMaxBorrowable(msg.sender, lender, _token);

            if (totalBorrowed < _amount) {
                uint256 toBorrow = min(_amount - totalBorrowed, maxBorrowable);

                if (toBorrow > 0) {
                    IERC20(_token).transferFrom(lender, msg.sender, toBorrow);
                    totalBorrowed += toBorrow;

                    // Create a new loan and store it in the borrower's loans array
                    Loan memory newLoan = Loan(lender, _token, toBorrow, false);
                     members[msg.sender].loans.push(newLoan);

                }
            }

            if (totalBorrowed >= _amount) {
                break;
            }
        }

        require(totalBorrowed == _amount, "Insufficient borrowed amount.");
    }

    function payBackIndividualLoan(uint256 _loanId) public {
        require(members[msg.sender].isMember, "You must be a member to pay back.");

        Loan storage loan = members[msg.sender].loans[_loanId];
        require(!loan.paidBack, "This loan has already been paid back.");

        IERC20(loan.token).transferFrom(msg.sender, loan.lender, loan.amount);
        loan.paidBack = true;
    }


    // Pay back a loan to multiple lenders
    function payBackAllLoans() external {
        require(members[msg.sender].isMember, "You must be a member to pay back.");

        uint256 loanCount = members[msg.sender].loans.length;
        for (uint256 i = 0; i < loanCount; i++) {
            if (!members[msg.sender].loans[i].paidBack) {
                payBackIndividualLoan(i);
            }
        }
    }



    // Remove a member
    function removeMember(address _member) external onlyOwner {
        require(members[_member].isMember, "This address is not a member.");
        members[_member].isMember = false;
        // Optional: clean up trust relationships
    }

    function _setTrust(address _member, uint256 _amount) internal {
        members[msg.sender].trustedMembers[_member] = true;
        members[_member].trustingMembers.push(msg.sender);
        members[msg.sender].trustedAmount[_member] = _amount;
    }

    function _removeTrust(address _member) internal {
        members[msg.sender].trustedMembers[_member] = false;
        removeAddressFromArray(_member, members[msg.sender].trustingMembers);
        members[msg.sender].trustedAmount[_member] = 0;

    }

    function min(uint256 a, uint256 b) private pure returns (uint256) {
        return a < b ? a : b;
    }

    function removeAddressFromArray(address _addressToRemove, address[] storage array) internal {
        uint256 length = array.length;
        for (uint256 i = 0; i < length; i++) {
            if (array[i] == _addressToRemove) {
                array[i] = array[length - 1];
                array.pop();
                break;
            }
        }
    }
}
