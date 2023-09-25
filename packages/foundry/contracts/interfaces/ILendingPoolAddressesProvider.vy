interface ILendingPoolAddressesProvider:
    def getAddress(id: bytes32) -> address: view
    def getLendingPool() -> address: view
