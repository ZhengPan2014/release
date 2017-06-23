export LSB_RELEASE_ID=`lsb_release -i | awk -F '\t' '{print $2}'`;
export LSB_RELEASE_RELEASE=`lsb_release -r | awk -F '\t' '{print $2}'`;
export LSB_RELEASE_CODENAME=`lsb_release -c | awk -F '\t' '{print $2}'`;
export LSB_RELEASE_ALL=$LSB_RELEASE_ID" "$LSB_RELEASE_RELEASE" "$LSB_RELEASE_CODENAME;
export LSB_RELEASE_WARN="";
export LSB_RELEASE_ERROR="";

if [[ $LSB_RELEASE_ID != "Ubuntu" ]];
then LSB_RELEASE_ERROR=$LSB_RELEASE_ALL;
else if [[ $LSB_RELEASE_ALL != "Ubuntu 14.04 trusty" ]];
#then if [[ $LSB_RELEASE_ALL != "Ubuntu 16.04 xenial xerus" ]];
then LSB_RELEASE_WARN=$LSB_RELEASE_ALL;
#fi;
fi;
fi;
