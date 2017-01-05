cd ~/workspaces/hitrobot/release;
rostopic pub -1 /shell_feedback std_msgs/String "update `git pull`";
_RC=$?;
if [ $_RC -eq 0 ]; then
    rostopic pub -1 /shell_feedback std_msgs/String "update success";
else
    rostopic pub -1 /shell_feedback std_msgs/String "update failure";
fi;
unset _RC;