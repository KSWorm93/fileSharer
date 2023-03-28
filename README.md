# File Sharing Program


### Naming requirements
1: NO '&' in filename


### Quickstart
From a linux machine use this function on the folder containing your files
to rename those files and replace '&' with 'and'

renameRecusive-and() {
	find -depth -name '*&*' -execdir bash -c 'mv -- "$1" "${1//&/and}"' bash {} \;
}

execute: 'npm start' from terminal