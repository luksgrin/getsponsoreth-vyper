# @version ^0.3.9
"""
@title Owner-Based Access Control Functions
@custom:contract-name Ownable
@license GNU Affero General Public License v3.0 only
@author pcaversaccio
@notice These functions can be used to implement a basic access
        control mechanism, where there is an account (an owner)
        that can be granted exclusive access to specific functions.
        By default, the owner account will be the one that deploys
        the contract. This can later be changed with `transfer_ownership`.
        An exemplary integration can be found in the ERC-20 implementation here:
        https://github.com/pcaversaccio/snekmate/blob/main/src/tokens/ERC20.vy.
        The implementation is inspired by OpenZeppelin's implementation here:
        https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol.
"""

import GetSponsorETH as GetSponsorETH
import interfaces.ILendingPool as ILendingPool
from vyper.interfaces import ERC20 as IERC20

#####################################################
#               SponsoredPools main                 #
#####################################################

sponsorETH: public(address)
beneficiary: public(address)
lendingPool: public(address)

supporters: public(HashMap[address, uint256])
tokensStaked: public(HashMap[address, HashMap[address, uint256]])
totalStaked: public(HashMap[address, uint256])

@external
def iinit( # cannot define init because it's a reserved word
    _lending_pool: address,
    _sponsor_ETH: address,
    _beneficiary: address
    ):
    self.lendingPool = _lending_pool
    self.sponsorETH = _sponsor_ETH
    self.beneficiary = _beneficiary

@external
@payable
def stake(supporter: address, token: address, amount: uint256):
    assert msg.sender == self.owner, "Only the owner can stake"
    self.tokensStaked[token][supporter] += amount
    self.totalStaked[token] += amount

@external
def unstake(supporter: address, token: address):
    assert msg.sender == self.owner, "Only the owner can unstake"
    unstake_amount: uint256 = self.tokensStaked[token][supporter]
    assert unstake_amount > 0, "no stake"
    self.tokensStaked[token][supporter] = 0
    self.totalStaked[token] -= unstake_amount
    ILendingPool(self.lendingPool).withdraw(
        token,
        unstake_amount,
        supporter
    )

# claim yield generated by stake
@external
def claim(token: address, a_token: address):
    amount: uint256 = self._claimable(token, a_token)
    ILendingPool(self.lendingPool).withdraw(
        token,
        amount,
        self.beneficiary
    )

# claimable returns total stake claimable
@internal
@view
def _claimable(token: address, a_token: address) -> uint256:
    total: uint256 = self.totalStaked[token]
    a_Balance: uint256 = IERC20(a_token).balanceOf(self)
    return a_Balance - total

@external
@view
def claimable(token: address, a_token: address) -> uint256:
    return self._claimable(token, a_token)

@external
@payable
def __default__():
    pass

#####################################################
#         snekmate's Ownable Implementation         #
#####################################################

# @dev Returns the address of the current owner.
owner: public(address)

# @dev Emitted when the ownership is transferred
# from `previous_owner` to `new_owner`.
event OwnershipTransferred:
    previous_owner: indexed(address)
    new_owner: indexed(address)

@external
@payable
def __init__():
    """
    @dev To omit the opcodes for checking the `msg.value`
         in the creation-time EVM bytecode, the constructor
         is declared as `payable`.
    @notice The `owner` role will be assigned to
            the `msg.sender`.
    """
    self._transfer_ownership(msg.sender)

@external
def transfer_ownership(new_owner: address):
    """
    @dev Transfers the ownership of the contract
         to a new account `new_owner`.
    @notice Note that this function can only be
            called by the current `owner`. Also,
            the `new_owner` cannot be the zero address.
    @param new_owner The 20-byte address of the new owner.
    """
    self._check_owner()
    assert new_owner != empty(address), "Ownable: new owner is the zero address"
    self._transfer_ownership(new_owner)


@external
def renounce_ownership():
    """
    @dev Leaves the contract without an owner.
    @notice Renouncing ownership will leave the
            contract without an owner, thereby
            removing any functionality that is
            only available to the owner.
    """
    self._check_owner()
    self._transfer_ownership(empty(address))


@internal
def _check_owner():
    """
    @dev Throws if the sender is not the owner.
    """
    assert msg.sender == self.owner, "Ownable: caller is not the owner"


@internal
def _transfer_ownership(new_owner: address):
    """
    @dev Transfers the ownership of the contract
         to a new account `new_owner`.
    @notice This is an `internal` function without
            access restriction.
    @param new_owner The 20-byte address of the new owner.
    """
    old_owner: address = self.owner
    self.owner = new_owner
    log OwnershipTransferred(old_owner, new_owner)
