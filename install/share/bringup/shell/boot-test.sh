# PATH_SHELL
export PATH_SHELL=`S=\`readlink "$0"\`; [ -z "$S" ] && S=$0; dirname $S`;
PATH_SHELL=`dirname $0`"/"$PATH_SHELL;

# FILE_LOG
cd $PATH_SHELL;
export FILE_LOG=../param/.log;
if [ -f $FILE_LOG ];
then rm $FILE_LOG;
fi;

# NODEJS_ORG
cd $PATH_SHELL;
source nodejs_org.sh;

# LSB_RELEASE
cd $PATH_SHELL;
source lsb_release.sh;
if [[ $LSB_RELEASE_ERROR ]];
then echo [ERROR][LSB_RELEASE]$LSB_RELEASE_ERROR>>$FILE_LOG;
echo -e "\033[31m[ERROR][LSB_RELEASE]$LSB_RELEASE_ERROR \033[0m";
else if [[ $LSB_RELEASE_WARN ]];
then echo [WARN][LSB_RELEASE]$LSB_RELEASE_WARN>>$FILE_LOG;
echo -e "\033[33m[WARN][LSB_RELEASE]$LSB_RELEASE_WARN \033[0m";
else echo [INFO][LSB_RELEASE]ok>>$FILE_LOG;
echo [INFO][LSB_RELEASE]ok;
fi;

# DPKG_APACHE2
cd $PATH_SHELL;
source dpkg-apache2.sh;
if [[ $DPKG_APACHE2_ERROR ]];
then echo [ERROR][DPKG_APACHE2]$DPKG_APACHE2_ERROR>>$FILE_LOG;
echo -e "\033[31m[ERROR][DPKG_APACHE2]$DPKG_APACHE2_ERROR \033[0m";
else if [[ $DPKG_APACHE2_WARN ]];
then echo [WARN][DPKG_APACHE2]$DPKG_APACHE2_WARN>>$FILE_LOG;
echo -e "\033[33m[WARN][DPKG_APACHE2]$DPKG_APACHE2_WARN \033[0m";
else echo [INFO][DPKG_APACHE2]ok>>$FILE_LOG;
echo [INFO][DPKG_APACHE2]ok;
fi;

# TODO: main part

fi;
fi;
