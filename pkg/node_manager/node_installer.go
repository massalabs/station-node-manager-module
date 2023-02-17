package node_manager

import (
	"bufio"
	"fmt"
	"os"

	ansibler "github.com/febrianrendak/go-ansible"
)

func Install(node Node) (string, error) {

	if os.Chmod(node.GetSSHKeyPath(), 0600) != nil {
		return "", fmt.Errorf("unable to set sshKey file permissions")
	}

	err := node.addNode()
	if err != nil {
		return "", err
	}

	return node.runPlaybook()
}

func CreateDirIfNotExists(dirname string) error {
	_, err := os.Stat(dirname)
	if os.IsNotExist(err) {
		err = os.Mkdir(dirname, 0755)
		if err != nil {
			return err
		}
	}

	return nil
}

func (node *Node) runPlaybook() (string, error) {
	vars := make(map[string]interface{})
	vars["discord_id"] = node.DiscordId
	vars["wallet_password"] = node.WalletPassword

	ansiblePlaybookConnectionOptions := &ansibler.AnsiblePlaybookConnectionOptions{
		Connection: "ssh",
		PrivateKey: node.GetSSHKeyPath(), // ansible_ssh_private_key_file
		User:       node.Username,        // ansible_user
	}

	ansiblePlaybookOptions := &ansibler.AnsiblePlaybookOptions{
		ExtraVars: vars,
		Inventory: node.Host + ",",
	}

	var f *os.File
	writer := bufio.NewWriter(f)

	playbook := &ansibler.AnsiblePlaybookCmd{
		Playbook:          "./automation/playbook.yml",
		ConnectionOptions: ansiblePlaybookConnectionOptions,
		Options:           ansiblePlaybookOptions,
		Writer:            writer,
	}

	err := playbook.Run()
	if err != nil {
		return "", err
	}

	return "", nil
}
