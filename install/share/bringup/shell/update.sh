cd ~/workspaces/hitrobot/release;
rostopic pub -1 /shell_feedback std_msgs/String "software_update `git pull`";
_RC=$?;
if [ $_RC -eq 0 ]; then
    rostopic pub -1 /shell_feedback std_msgs/String "software_update success";
else
    rostopic pub -1 /shell_feedback std_msgs/String "software_update failure";
fi;
unset _RC;