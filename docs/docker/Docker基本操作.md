# Docker基本操作
## docker的安装和使用
- 我用的是Ubuntu16，可以执行下面命令快捷安装
```bash
sudo apt-get install docker.io
```
- 如果是其他linux发行版，如CentOS可以用Yum命令，也可以执行下面的从网络获取的脚本来进行安装
```bash
curl -s http://get.docker.com|sh
```
## docker服务的启动、停止和重启
```bash
sudo service docker start
sudo service docker stop
sudo service docker restart
```
- 输入
```bash
sudo docker version 
```
- 看到下图就是启动成功了
![Paste_Image.png](http://upload-images.jianshu.io/upload_images/3372306-9c37ed68d68fd2c7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 镜像的拉取（pull）
- docker官方的镜像仓库：hub.docker.com
- 网易的仓库：c.163.com
- docker的命令基本都是要root权限的，所以我们直接su进入root进行操作

```bash
//从远程仓库拉取镜像到本地仓库
docker pull [OPTIONS] NAME[:TAG]
//显示本地仓库的镜像
docker images [OPTIONS] [RESPOSITORY[:TAG]]
//从指定的一个本地镜像创建一个容器
docker run [OPTIONS] IMAGE[:TAG][COMMAND][ARG...]    -d 后台运行	-p 8080:80 主机端口：容器端口 
//删除一个镜像
docker rmi imageId
```

## 容器的操作
```bash
//打印正在运行的容器，加上-a打印所有容器
docker ps
//停止一个容器
docker stop containerId
//重启一个容器
docker restart containerId
//进入一个容器
docker exec -it containerId bash
//删除一个容器
docker rm containerId
//删除已经退出运行的所有容器
docker ps -a | grep "Exited" | awk '{print $1 }'|xargs docker rm
```

## 镜像的创建
- vim Dockerfile
```bash
from ubuntu16/tomcat/jpress

MAINTAINER granda grandachn@163.com

ENV JAVA_HOME  /usr/lib/jvm/jdk1.8.0_121
ENV PATH      $JAVA_HOME/bin:$PATH
ENV CLASSPATH   .:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

ENTRYPOINT /usr/local/tomcat/bin/startup.sh && tail -F /root/apache-tomcat-7.0.70/logs/catalina.out
```
- 注意：执行完脚本命令后容器是会自动停止的，所以要用tail命令持续输出日志内容，使得容器保持运行
- 在Dockerfile目录下执行下面命令构建镜像
```bash
docker build -t jpress:latest .
```
- 也可以根据创建的这个容器来提交一个新的镜像，提交时需要用到容器ID
```bash
docker commit –m “testMessage” –a “granda” d8990fec2141 testimage
```
- 或者，也可以从操作系统模板文件导入一个镜像
```bash
wget http://download.openvz.org/template/precreated/ubuntu-14.04-x86_64-minimal.tar.gz
sudo cat ubuntu–14.04–x86_64–minimal.tar.gz | docker import – ubuntu:14.04
```

## 镜像的存出和载入
```bash
docker save –o /data/testimage.tar testimage:latest
docker load —input testimage.tar
//或者
docker load < testimage.tar
```
## 镜像的上传
```bash
docker push NAME[:TAG] 
docker tag testimage:lastest granda/testimage:lastest
docker push granda/testimage:lastest
```

## 容器和主机间的文件复制
```bash
docker cp foo.txt mycontainer:/foo.txt
docker cp mycontainer:/foo.txt foo.txt
```
## Linux和远程主机的文件复制
```bash
scp /home/granda/Desktop/test.txt root@192.168.1.100:/root/
```

