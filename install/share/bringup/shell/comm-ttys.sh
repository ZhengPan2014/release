export ROS_USER_TTYS=70-persistent-tty.rules;
export ROS_USER_PRE='SUBSYSTEM=="tty", ENV{ID_PATH}=="pci-0000:00:14.0-usb-0:';
export ROS_USER_SUF=':1.0", SYMLINK+=';

cd /etc/udev/rules.d;
sudo rm $ROS_USER_TTYS;

echo 'KERNEL=="ttyS[0-9]*", MODE="0666"'            | sudo tee -a $ROS_USER_TTYS
echo 'KERNEL=="ttyUSB[0-9]*", MODE="0666"'          | sudo tee -a $ROS_USER_TTYS
echo                                                | sudo tee -a $ROS_USER_TTYS
#echo $ROS_USER_PRE"2.2"$ROS_USER_SUF"usb_first"     | sudo tee -a $ROS_USER_TTYS
#echo $ROS_USER_PRE"2.3"$ROS_USER_SUF"usb_second"    | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1"$ROS_USER_SUF"usb_right"       | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2"$ROS_USER_SUF"usb_left"        | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3"$ROS_USER_SUF"usb_bottom"      | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4"$ROS_USER_SUF"usb_top"         | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5"$ROS_USER_SUF"usb_extern"      | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6"$ROS_USER_SUF"usb_intern"      | sudo tee -a $ROS_USER_TTYS
echo                                                | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1.1"$ROS_USER_SUF"usb_right1"    | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1.2"$ROS_USER_SUF"usb_right2"    | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1.3"$ROS_USER_SUF"usb_right3"    | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1.4"$ROS_USER_SUF"usb_right4"    | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2.1"$ROS_USER_SUF"usb_left1"     | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2.2"$ROS_USER_SUF"usb_left2"     | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2.3"$ROS_USER_SUF"usb_left3"     | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2.4"$ROS_USER_SUF"usb_left4"     | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3.1"$ROS_USER_SUF"usb_bottom1"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3.2"$ROS_USER_SUF"usb_bottom2"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3.3"$ROS_USER_SUF"usb_bottom3"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3.4"$ROS_USER_SUF"usb_bottom4"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.1"$ROS_USER_SUF"usb_top1"      | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.2"$ROS_USER_SUF"usb_top2"      | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.3"$ROS_USER_SUF"usb_top3"      | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.4"$ROS_USER_SUF"usb_top4"      | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5.1"$ROS_USER_SUF"usb_extern1"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5.2"$ROS_USER_SUF"usb_extern2"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5.3"$ROS_USER_SUF"usb_extern3"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5.4"$ROS_USER_SUF"usb_extern4"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6.1"$ROS_USER_SUF"usb_intern1"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6.2"$ROS_USER_SUF"usb_intern2"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6.3"$ROS_USER_SUF"usb_intern3"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6.4"$ROS_USER_SUF"usb_intern4"   | sudo tee -a $ROS_USER_TTYS
echo                                                | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1.1.1"$ROS_USER_SUF"usb_right11" | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1.1.2"$ROS_USER_SUF"usb_right12" | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1.1.3"$ROS_USER_SUF"usb_right13" | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1.1.4"$ROS_USER_SUF"usb_right14" | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1.2.1"$ROS_USER_SUF"usb_right21" | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1.2.2"$ROS_USER_SUF"usb_right22" | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1.2.3"$ROS_USER_SUF"usb_right23" | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1.2.4"$ROS_USER_SUF"usb_right24" | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1.3.1"$ROS_USER_SUF"usb_right31" | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1.3.2"$ROS_USER_SUF"usb_right32" | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1.3.3"$ROS_USER_SUF"usb_right33" | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1.3.4"$ROS_USER_SUF"usb_right34" | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1.4.1"$ROS_USER_SUF"usb_right41" | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1.4.2"$ROS_USER_SUF"usb_right42" | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1.4.3"$ROS_USER_SUF"usb_right43" | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"1.4.4"$ROS_USER_SUF"usb_right44" | sudo tee -a $ROS_USER_TTYS
echo                                                | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2.1.1"$ROS_USER_SUF"usb_left11"  | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2.1.2"$ROS_USER_SUF"usb_left12"  | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2.1.3"$ROS_USER_SUF"usb_left13"  | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2.1.4"$ROS_USER_SUF"usb_left14"  | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2.2.1"$ROS_USER_SUF"usb_left21"  | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2.2.2"$ROS_USER_SUF"usb_left22"  | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2.2.3"$ROS_USER_SUF"usb_left23"  | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2.2.4"$ROS_USER_SUF"usb_left24"  | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2.3.1"$ROS_USER_SUF"usb_left31"  | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2.3.2"$ROS_USER_SUF"usb_left32"  | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2.3.3"$ROS_USER_SUF"usb_left33"  | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2.3.4"$ROS_USER_SUF"usb_left34"  | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2.4.1"$ROS_USER_SUF"usb_left41"  | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2.4.2"$ROS_USER_SUF"usb_left42"  | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2.4.3"$ROS_USER_SUF"usb_left43"  | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"2.4.4"$ROS_USER_SUF"usb_left44"  | sudo tee -a $ROS_USER_TTYS
echo                                                | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3.1.1"$ROS_USER_SUF"usb_bottom11"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3.1.2"$ROS_USER_SUF"usb_bottom12"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3.1.3"$ROS_USER_SUF"usb_bottom13"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3.1.4"$ROS_USER_SUF"usb_bottom14"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3.2.1"$ROS_USER_SUF"usb_bottom21"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3.2.2"$ROS_USER_SUF"usb_bottom22"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3.2.3"$ROS_USER_SUF"usb_bottom23"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3.2.4"$ROS_USER_SUF"usb_bottom24"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3.3.1"$ROS_USER_SUF"usb_bottom31"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3.3.2"$ROS_USER_SUF"usb_bottom32"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3.3.3"$ROS_USER_SUF"usb_bottom33"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3.3.4"$ROS_USER_SUF"usb_bottom34"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3.4.1"$ROS_USER_SUF"usb_bottom41"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3.4.2"$ROS_USER_SUF"usb_bottom42"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3.4.3"$ROS_USER_SUF"usb_bottom43"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"3.4.4"$ROS_USER_SUF"usb_bottom44"| sudo tee -a $ROS_USER_TTYS
echo                                                | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.1.1"$ROS_USER_SUF"usb_top11"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.1.2"$ROS_USER_SUF"usb_top12"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.1.3"$ROS_USER_SUF"usb_top13"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.1.4"$ROS_USER_SUF"usb_top14"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.2.1"$ROS_USER_SUF"usb_top21"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.2.2"$ROS_USER_SUF"usb_top22"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.2.3"$ROS_USER_SUF"usb_top23"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.2.4"$ROS_USER_SUF"usb_top24"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.3.1"$ROS_USER_SUF"usb_top31"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.3.2"$ROS_USER_SUF"usb_top32"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.3.3"$ROS_USER_SUF"usb_top33"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.3.4"$ROS_USER_SUF"usb_top34"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.4.1"$ROS_USER_SUF"usb_top41"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.4.2"$ROS_USER_SUF"usb_top42"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.4.3"$ROS_USER_SUF"usb_top43"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.4.4"$ROS_USER_SUF"usb_top44"   | sudo tee -a $ROS_USER_TTYS
echo                                                | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.1.1"$ROS_USER_SUF"usb_top11"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.1.2"$ROS_USER_SUF"usb_top12"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.1.3"$ROS_USER_SUF"usb_top13"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.1.4"$ROS_USER_SUF"usb_top14"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.2.1"$ROS_USER_SUF"usb_top21"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.2.2"$ROS_USER_SUF"usb_top22"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.2.3"$ROS_USER_SUF"usb_top23"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.2.4"$ROS_USER_SUF"usb_top24"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.3.1"$ROS_USER_SUF"usb_top31"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.3.2"$ROS_USER_SUF"usb_top32"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.3.3"$ROS_USER_SUF"usb_top33"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.3.4"$ROS_USER_SUF"usb_top34"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.4.1"$ROS_USER_SUF"usb_top41"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.4.2"$ROS_USER_SUF"usb_top42"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.4.3"$ROS_USER_SUF"usb_top43"   | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"4.4.4"$ROS_USER_SUF"usb_top44"   | sudo tee -a $ROS_USER_TTYS
echo                                                | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5.1.1"$ROS_USER_SUF"usb_extern11"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5.1.2"$ROS_USER_SUF"usb_extern12"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5.1.3"$ROS_USER_SUF"usb_extern13"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5.1.4"$ROS_USER_SUF"usb_extern14"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5.2.1"$ROS_USER_SUF"usb_extern21"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5.2.2"$ROS_USER_SUF"usb_extern22"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5.2.3"$ROS_USER_SUF"usb_extern23"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5.2.4"$ROS_USER_SUF"usb_extern24"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5.3.1"$ROS_USER_SUF"usb_extern31"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5.3.2"$ROS_USER_SUF"usb_extern32"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5.3.3"$ROS_USER_SUF"usb_extern33"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5.3.4"$ROS_USER_SUF"usb_extern34"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5.4.1"$ROS_USER_SUF"usb_extern41"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5.4.2"$ROS_USER_SUF"usb_extern42"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5.4.3"$ROS_USER_SUF"usb_extern43"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"5.4.4"$ROS_USER_SUF"usb_extern44"| sudo tee -a $ROS_USER_TTYS
echo                                                | sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6.1.1"$ROS_USER_SUF"usb_intern11"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6.1.2"$ROS_USER_SUF"usb_intern12"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6.1.3"$ROS_USER_SUF"usb_intern13"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6.1.4"$ROS_USER_SUF"usb_intern14"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6.2.1"$ROS_USER_SUF"usb_intern21"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6.2.2"$ROS_USER_SUF"usb_intern22"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6.2.3"$ROS_USER_SUF"usb_intern23"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6.2.4"$ROS_USER_SUF"usb_intern24"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6.3.1"$ROS_USER_SUF"usb_intern31"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6.3.2"$ROS_USER_SUF"usb_intern32"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6.3.3"$ROS_USER_SUF"usb_intern33"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6.3.4"$ROS_USER_SUF"usb_intern34"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6.4.1"$ROS_USER_SUF"usb_intern41"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6.4.2"$ROS_USER_SUF"usb_intern42"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6.4.3"$ROS_USER_SUF"usb_intern43"| sudo tee -a $ROS_USER_TTYS
echo $ROS_USER_PRE"6.4.4"$ROS_USER_SUF"usb_intern44"| sudo tee -a $ROS_USER_TTYS

sudo reboot;
