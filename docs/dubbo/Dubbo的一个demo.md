# Dubbo的一个demo
##  公共接口
![image.png](https://upload-images.jianshu.io/upload_images/3372306-b17cc359258f711f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

DemoService：
```java
public interface DemoService {
    List<String> getPermissions(Long id);
}

```


## provider
![image.png](https://upload-images.jianshu.io/upload_images/3372306-906aa9daff202eda.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

该项项目需要引用公共接口项目，以及spring、dubbo的包，pom文件如下：
```xml
<dependencies>
        <dependency>
            <groupId>com.granda</groupId>
            <artifactId>dubbo-api</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
        
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>4.2.6.RELEASE</version>
        </dependency>

        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>dubbo</artifactId>
            <version>2.5.3</version>
        </dependency>
        
        <dependency>
            <groupId>com.101tec</groupId>
            <artifactId>zkclient</artifactId>
            <version>0.9</version>
        </dependency>
</dependencies>
```

DemoServiceImpl是DemoService的实现：
```java
public class DemoServiceImpl implements DemoService {
    @Override
    public List<String> getPermissions(Long id) {
        List<String> demo = new ArrayList<String>();
        demo.add(String.format("Permission_%d", id - 1));
        demo.add(String.format("Permission_%d", id));
        demo.add(String.format("Permission_%d", id + 1));
        return demo;
    }
}
```

Provide是启动入口：
```java
public class Provider {
    public static void main(String[] args) throws IOException {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("provider.xml");
        System.out.println(context.getDisplayName() + ": here");
        context.start();
        System.out.println("服务已经启动...");
        System.in.read();
    }
}
```

provider.xml是dubbo的配置文件：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://code.alibabatech.com/schema/dubbo
        http://code.alibabatech.com/schema/dubbo/dubbo.xsd
        ">
    <!-- 具体的实现bean -->
    <bean id="demoService"
          class="com.granda.DemoServiceImpl" />
    <!-- 提供方应用信息，用于计算依赖关系 -->
    <dubbo:application name="anyname_provider" />
    <!-- 使用zookeeper注册中心暴露服务地址 -->
    <dubbo:registry address="zookeeper://127.0.0.1:2181" />
    <!-- 用dubbo协议在20880端口暴露服务 -->
    <dubbo:protocol name="dubbo" port="20880" />
    <!-- 声明需要暴露的服务接口 -->
    <dubbo:service interface="com.granda.DemoService"
                   ref="demoService" />
</beans>
```

## consumer
![image.png](https://upload-images.jianshu.io/upload_images/3372306-0ff4af5f82e71b8d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

pom文件同服务提供者

Consumer是启动入口文件，调用Dubbo的服务：
```java
public class Consumer {
    public static void main(String[] args) {
        //测试常规服务
        ClassPathXmlApplicationContext context =
                new ClassPathXmlApplicationContext("consumer.xml");
        context.start();
        System.out.println("consumer start");
        DemoService demoService = context.getBean(DemoService.class);
        System.out.println("consumer");
        System.out.println(demoService.getPermissions(1L));
        System.out.println(demoService.getPermissions(100L));
        System.out.println(demoService.getPermissions(200L));
    }

}
```
consumer.xml:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
       http://code.alibabatech.com/schema/dubbo http://code.alibabatech.com/schema/dubbo/dubbo.xsd">
    <dubbo:application name="demotest-consumer" owner="programmer" organization="dubbox"/>
    <!--向 zookeeper 订阅 provider 的地址，由 zookeeper 定时推送-->
    <dubbo:registry address="zookeeper://localhost:2181"/>
    <!--使用 dubbo 协议调用定义好的 api.PermissionService 接口-->
    <dubbo:reference id="demoService" interface="com.granda.DemoService"/>
</beans>
```