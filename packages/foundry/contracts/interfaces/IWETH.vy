# interface IWETH:
@external
@view
def allowance(owner: address, spender: address) -> uint256:
    pass

@external
def approve(spender: address, value_: uint256) -> bool:
    pass

@external
@view
def balanceOf(owner: address) -> uint256:
    pass

@external
@view
def decimals() -> uint8:
    pass

@external
@payable
def deposit():
    pass

@external
@view
def name() -> String[100]:
    pass

@external
@view
def symbol() -> String[100]:
    pass

@external
@view
def totalSupply() -> uint256:
    pass

@external
def transfer(to: address, value_: uint256) -> bool:
    pass

@external
def transferFrom(from_: address, to: address, value_: uint256) -> bool:
    pass

@external
def withdraw(wad: uint256):
    pass

