export JAVA_HOME=/opt/jdk1.8.0_60
export JRE_HOME=$JAVA_HOME/jre
export PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH
#maven
export MAVEN_HOME=/opt/apache-maven-3.3.3
export M2_HOME=$MAVEN_HOME
export PATH=$MAVEN_HOME/bin:$PATH

export CLASSPATH=.:$JRE_HOME/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

mvn -U clean test