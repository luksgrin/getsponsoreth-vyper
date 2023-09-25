import json, re

def parse_ScaffoldETHDeploy_struct(ScaffoldETHDeploy_array):
    tuple_pattern = r"\(([^)]+)\)"
    tuples = re.findall(tuple_pattern, ScaffoldETHDeploy_array)
    parsed_list = []

    for tup_str in tuples:
        tup_elements = [str(element.strip()) for element in tup_str.split(',')]
        parsed_tuple = tuple(tup_elements)
        parsed_list.append(parsed_tuple)

    return dict(parsed_list)

def modify_transactions(transactions, deploy_addresses):

    for tx in transactions:
        if tx["transactionType"] == "CREATE":
            if tx["contractName"] is None:
                idx = (
                    list(deploy_addresses.values())
                    .index(tx["contractAddress"])
                )
                tx["contractName"] = (
                    list(deploy_addresses.keys())
                    [idx]
                )

    return transactions


if __name__ == "__main__":
    broadcast_trace_path = "broadcast/Deploy.s.sol/31337/run-latest.json"
    with open(broadcast_trace_path) as f:
        broadcast_trace = json.load(f)

    deploy_addresses = parse_ScaffoldETHDeploy_struct(
        broadcast_trace["returns"]["0"]["value"]
    )

    broadcast_trace["transactions"] = modify_transactions(
        broadcast_trace["transactions"],
        deploy_addresses
    )

    with open(broadcast_trace_path, "w") as f:
        json.dump(broadcast_trace, f, indent=2)