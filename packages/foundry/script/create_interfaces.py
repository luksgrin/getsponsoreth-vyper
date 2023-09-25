from subprocess import Popen, PIPE
import os

def vyper_compile_and_make_solc_interface(filepath):

    parent_directory, filename = os.path.split(filepath)
    outputfile_path = os.path.join(
        parent_directory,
        filename.replace(".vy", ".sol")
    )

    command = f"bash -c 'cast interface <(vyper -f abi {filepath})'"
    process = Popen(
        command,
        shell=True,
        stdout=PIPE,
        stderr=PIPE,
        text=True
    )

    stdout, stderr = process.communicate()

    if process.returncode == 0:
        with open(outputfile_path, "w") as f:
            f.write(
                stdout.replace("Interface", filename.strip(".vy"))
            )
    else:
        print("Command failed. Error:")
        print(stderr)




if __name__ == "__main__":

    files = filter(
        lambda x: x.endswith(".vy"),
        os.listdir("contracts")
    )

    for file in files:
        vyper_compile_and_make_solc_interface(
            os.path.join("contracts", file)
        )