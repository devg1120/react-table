# ref
# https://www.tohoho-web.com/linux/cmd/diff.html
#

D1=src
D2=src_A
F=""

#D1=case04/gridsheet/src/components
#D2=case05/gridsheet/src/components
#F=Tabular.tsx


#MODE=1   # -y side-by-side supress common lines
#MODE=2   # -y side-by-side all line
#MODE=3   # -c context 
#MODE=4   # -u unified

MODE=1




LESS_BASE="less -R -S "
LESS=${LESS_BASE}

#echo $LESS

diff1() {

(

echo  "DIFF -y supress "  "${D1}/${F} "    ${D2}/${F}

diff -r -Bw -y --suppress-common-lines  $D1/$F $D2/$F

) | expand -t 8 | awk -v TARGET=$TARGET '

function basename(file) {
    sub(".*/", "", file)
    return file
}

function str_repeat(str, n, result) {
    for (i = 1; i <= n; i++) result = result str
    return result
}

BEGIN { PSEQ = 0 }
{
   if( $1 == "diff" ) {
     TARGET = basename($6)"|"
     L = length($6)
     T = length(TARGET)
     SPC = str_repeat(" ", 64 - L + T)
     print ""
     print "\033[1;32m"  $6 SPC $7  "\033[0m"
     print ""

   } else if( $1 == "DIFF" ) {
     print $0 
     print ""
   } else {

        F = substr($0,63,1);
        if( F == ">" ){
          print TARGET "\033[1;33m"  $0    "\033[0m"
        } else if ( F == "<" ) {
          print TARGET "\033[1;34m"  $0    "\033[0m"
        } else if ( F == "|" ) {
          print TARGET "\033[1;36m"  $0    "\033[0m"
        } else {
          print TARGET $0
        }
   }
}
'  | `eval echo $LESS`

}

diff2() {
(

echo  "DIFF -y allline "  "${D1}/${F} "    ${D2}/${F}
diff -r -Bw -y $D1/$F $D2/$F

) | expand -t 8 | awk -v TARGET=$TARGET '

function basename(file) {
    sub(".*/", "", file)
    return file
}

function str_repeat(str, n, result) {
    for (i = 1; i <= n; i++) result = result str
    return result
}

BEGIN { PSEQ = 0 }
{
   if( $1 == "diff" ) {
     TARGET = basename($5)"|"
     L = length($5) 
     T = length(TARGET)
     SPC = str_repeat(" ", 64 - L + T)
     print ""
     print "\033[1;32m"  $5 SPC $6  "\033[0m"
     print ""

   } else if( $1 == "DIFF" ) {
     print $0 
     print ""
   } else {

        F = substr($0,63,1);
        if( F == ">" ){
          print TARGET "\033[1;33m"  $0    "\033[0m"
        } else if ( F == "<" ) {
          print TARGET "\033[1;34m"  $0    "\033[0m"
        } else if ( F == "|" ) {
          print TARGET "\033[1;36m"  $0    "\033[0m"
        } else {
          print TARGET $0
        }
   }
}
'  | `eval echo $LESS`

}

diff2L() {
(

echo  "DIFF -y allline left "  "${D1}/${F} "    ${D2}/${F}
diff -r -Bw -y --left-column $D1/$F $D2/$F

) | expand -t 8 | awk -v TARGET=$TARGET '

function basename(file) {
    sub(".*/", "", file)
    return file
}

function str_repeat(str, n, result) {
    for (i = 1; i <= n; i++) result = result str
    return result
}

BEGIN { PSEQ = 0 }
{
   if( $1 == "diff" ) {
     TARGET = basename($6)"|"
     L = length($6) 
     T = length(TARGET)
     SPC = str_repeat(" ", 64 - L + T)
     print ""
     print "\033[1;32m"  $6 SPC $7  "\033[0m"
     print ""

   } else if( $1 == "DIFF" ) {
     print $0 
     print ""
   } else {

        F = substr($0,63,1);
        if( F == ">" ){
          print TARGET "\033[1;33m"  $0    "\033[0m"
        } else if ( F == "<" ) {
          print TARGET "\033[1;34m"  $0    "\033[0m"
        } else if ( F == "|" ) {
          print TARGET "\033[1;36m"  $0    "\033[0m"
        } else {
          print TARGET $0
        }
   }
}
'  | `eval echo $LESS`

}


diff3() {
(

echo  "DIFF -c "  "${D1}/${F} "    ${D2}/${F}
diff -r -Bw  -c --color=always $D1/$F $D2/$F

) | expand -t 8 | awk -v TARGET=$TARGET '

function basename(file) {
    sub(".*/", "", file)
    return file
}

function str_repeat(str, n, result) {
    for (i = 1; i <= n; i++) result = result str
    return result
}

BEGIN { PSEQ = 0 }
{
   if( $1 == "diff" ) {
     TARGET = basename($6)"|"
     L = length($6) 
     T = length(TARGET)
     SPC = str_repeat(" ", 64 - L + T)
     print ""
     print "\033[1;32m"  $6 SPC $7  "\033[0m"
     print ""

   } else if( $1 == "DIFF" ) {
     print $0 
     print ""
   } else {

        F = substr($0,63,1);
        if( F == ">" ){
          print TARGET "\033[1;33m"  $0    "\033[0m"
        } else if ( F == "<" ) {
          print TARGET "\033[1;34m"  $0    "\033[0m"
        } else if ( F == "|" ) {
          print TARGET "\033[1;36m"  $0    "\033[0m"
        } else {
          print TARGET $0
        }
   }
}
'  | `eval echo $LESS`

}

diff4() {
(

echo  "DIFF -u "  "${D1}/${F} "    ${D2}/${F}
diff -r -Bw -u --color=always $D1/$F $D2/$F

) | expand -t 8 | awk -v TARGET=$TARGET '

function basename(file) {
    sub(".*/", "", file)
    return file
}

function str_repeat(str, n, result) {
    for (i = 1; i <= n; i++) result = result str
    return result
}

BEGIN { PSEQ = 0 }
{
   if( $1 == "diff" ) {
     TARGET = basename($6)"|"
     L = length($6) 
     T = length(TARGET)
     SPC = str_repeat(" ", 64 - L + T)
     print ""
     print "\033[1;32m"  $6 SPC $7  "\033[0m"
     print ""

   } else if( $1 == "DIFF" ) {
     print $0 
     print ""
   } else {

        F = substr($0,63,1);
        if( F == ">" ){
          print TARGET "\033[1;33m"  $0    "\033[0m"
        } else if ( F == "<" ) {
          print TARGET "\033[1;34m"  $0    "\033[0m"
        } else if ( F == "|" ) {
          print TARGET "\033[1;36m"  $0    "\033[0m"
        } else {
          print TARGET $0
        }
   }
}
'  | `eval echo $LESS`

}
#diff1 $*

case "$MODE" in
  "1")
    diff1 $*
    ;;
  "2")
    diff2 $*
    ;;
  "2L")
    diff2L $*
    ;;
  "3")
    diff3 $*
    ;;
  "4")
    diff4 $*
    ;;
  *)
    echo ""
    ;;
esac

################################################################################
exit



setc() {
NC='\033[0m'       # Text Reset
# Regular Colors
BLACK='\033[0;30m'        # BLACK
RED='\033[0;31m'          # RED
GREEN='\033[0;32m'        # GREEN
YELLOW='\033[0;33m'       # YELLOW
BLUE='\033[0;34m'         # BLUE
PURPLE='\033[0;35m'       # PURPLE
CYAN='\033[0;36m'         # CYAN
WHITE='\033[0;37m'        # WHITE
# Bold
BBLACK='\033[1;30m'       # BLACK
BRED='\033[1;31m'         # RED
BGREEN='\033[1;32m'       # GREEN
BYELLOW='\033[1;33m'      # YELLOW
BBLUE='\033[1;34m'        # BLUE
BPURPLE='\033[1;35m'      # PURPLE
BCYAN='\033[1;36m'        # CYAN
BWHITE='\033[1;37m'       # WHITE
# Underline
UBLACK='\033[4;30m'       # BLACK
URED='\033[4;31m'         # RED
UGREEN='\033[4;32m'       # GREEN
UYELLOW='\033[4;33m'      # YELLOW
UBLUE='\033[4;34m'        # BLUE
UPURPLE='\033[4;35m'      # PURPLE
UCYAN='\033[4;36m'        # CYAN
UWHITE='\033[4;37m'       # WHITE
# Background
BGBLACK='\033[40m'       # BLACK
BGRED='\033[41m'         # RED
BGGREEN='\033[42m'       # GREEN
BGYELLOW='\033[43m'      # YELLOW
BGBLUE='\033[44m'        # BLUE
BGPURPLE='\033[45m'      # PURPLE
BGCYAN='\033[46m'        # CYAN
BGWHITE='\033[47m'       # WHITE
# High Intensity
HIBLACK='\033[0;90m'       # BLACK
HIRED='\033[0;91m'         # RED
HIGREEN='\033[0;92m'       # GREEN
HIYELLOW='\033[0;93m'      # YELLOW
HIBLUE='\033[0;94m'        # BLUE
HIPURPLE='\033[0;95m'      # PURPLE
HICYAN='\033[0;96m'        # CYAN
HIWHITE='\033[0;97m'       # WHITE
# Bold High Intensity
BIBLACK='\033[1;90m'      # BLACK
BIRED='\033[1;91m'        # RED
BIGREEN='\033[1;92m'      # GREEN
BIYELLOW='\033[1;93m'     # YELLOW
BIBLUE='\033[1;94m'       # BLUE
BIPURPLE='\033[1;95m'     # PURPLE
BICYAN='\033[1;96m'       # CYAN
BIWHITE='\033[1;97m'      # WHITE
# High Intensity backgrounds
BGHIBLACK='\033[0;100m'   # BLACK
BGHIRED='\033[0;101m'     # RED
BGHIGREEN='\033[0;102m'   # GREEN
BGHIYELLOW='\033[0;103m'  # YELLOW
BGHIBLUE='\033[0;104m'    # BLUE
BGHIPURPLE='\033[0;105m'  # PURPLE
BGHICYAN='\033[0;106m'    # CYAN
BGHIWHITE='\033[0;107m'   # WHITE
}

