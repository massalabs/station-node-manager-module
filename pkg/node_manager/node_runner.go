package node_manager

import (
	"fmt"
	"os"
	"path"

	"github.com/sfreiberg/simplessh"
)

func (node *Node) getSSHClient() (*simplessh.Client, error) {

	client, err := simplessh.ConnectWithKeyFile(node.Host, node.Username, node.GetSSHKeyPath())
	if err != nil {
		return nil, err
	}

	return client, nil
}

func (node *Node) StartNode() (string, error) {
	output, err := node.runCommandSSH("sudo docker compose up --pull -d")
	if err != nil {
		return "", err
	}

	return string(output), nil
}

func (node *Node) StopNode() (string, error) {
	output, err := node.runCommandSSH("sudo docker compose stop")
	if err != nil {
		return "", err
	}

	return string(output), nil
}

func (node *Node) GetLogs() (string, error) {
	output, err := node.runCommandSSH("sudo docker compose logs -n 100")

	if err != nil {
		return "", err
	}

	return string(output), nil
}

func (node *Node) BackupWallet() (string, error) {
	backupFile := "wallet_backup.zip"
	localFile := path.Join(WORKING_DIR, node.Id+"_"+backupFile)

	_, err := os.Stat(localFile)
	if !os.IsNotExist(err) {
		// backup file already present
		return localFile, nil
	}

	output, err := node.runCommandSSH(`zip -j ` + backupFile + ` wallet_backup.zip \
	massa_mount/node_privkey.key massa_mount/staking_wallet.dat massa_mount/wallet.dat`)

	if err != nil {
		return "", err
	}

	fmt.Println(string(output))

	err = node.DownloadFileSSH(
		fmt.Sprintf("/home/%s/%s", node.Username, backupFile),
		localFile)

	if err != nil {
		return "", err
	}

	return localFile, nil
}

func (node *Node) runCommandSSH(command string) ([]byte, error) {
	client, err := node.getSSHClient()
	if err != nil {
		return []byte{}, err
	}

	defer client.Close()

	return client.Exec(command)
}

func (node *Node) uploadFileSSH(local string, remote string) error {
	client, err := node.getSSHClient()
	if err != nil {
		return err
	}

	defer client.Close()

	return client.Upload(local, remote)
}

func (node *Node) DownloadFileSSH(remote string, local string) error {
	client, err := node.getSSHClient()
	if err != nil {
		return err
	}

	defer client.Close()

	return client.Download(remote, local)
}
