# interface ILendingPool:
@external
def deposit(asset: address, amount: uint256, onBehalfOf: address, referralCode: uint16):
    pass

@external
@view
def getAddressesProvider() -> address:
    pass

@external
def withdraw(asset: address, amount: uint256, to: address) -> uint256:
    pass

# interface ILendingPoolAddressesProvider:
@external
@view
def getAddress(id: bytes32) -> address:
    pass

@external
@view
def getLendingPool() -> address:
    pass

