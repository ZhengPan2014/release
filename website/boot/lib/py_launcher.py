import socket
import roslaunch

def launch(roslaunch_strs):
	uuid = roslaunch.rlutil.get_or_generate_uuid(None, False)
	roslaunch.configure_logging(uuid)
	launch = roslaunch.parent.ROSLaunchParent(uuid, [], roslaunch_strs=roslaunch_strs)
	launch.start()
	launch.spin()

def main():
	socket_cli = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	socket_cli.connect(('127.0.0.1', 8809))
	roslaunch_str = ''
	while True:
		data = socket_cli.recv(1024)
		roslaunch_str += data
		if roslaunch_str[-3:] == 'EOD':
			break
	roslaunch_strs = [roslaunch_str[0:-3]]
	socket_cli.close()
	launch(roslaunch_strs)

if __name__ == '__main__':
	main()