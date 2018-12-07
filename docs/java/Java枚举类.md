# Java枚举类
关于Java枚举类的博文有很多，但是很多都是说怎么去用枚举，少有全面地把枚举类给将清楚的。本文将从枚举类的作用说起，到个人对枚举类的一些工程实践，然后从字节码去剖析枚举类的本质，介绍枚举类name和ordinal，EnumSet和EnumMap枚举集合类为何物，最后涉及枚举在单例模式和职责链模式中的应用。
## 枚举类的作用
1. 代码硬编码的魔数，就是说用枚举代替int，可以避免使用数字做条件对比给硬编码到代码中，给后期维护带来隐患。
2. 枚举类可以保存更多字段，用于相应码之类的。java的后端编程中，controller层一般是要给前端返回一个响应码和对应的描述信息，如{code: 200, detail: "执行成功"}，这时就可以将这个响应体写成一个枚举类。
3. 数据库字段的前端展示的格式化可以借助枚举类实现。比如说，数据库存储用户的性别是0和1，数据传回前端的时候要转成男和女就可以借助枚举类，代码可参考后文的示例代码。
## 枚举类的工程实践
```java
public enum  Gender {
    MAN("男", 0),
    WOMENR("女", 1);

    public static final Map<Integer,Gender> FROM_CODE_MAP = new HashMap<>();
    
    private String name;
    private Integer code;

    static {
         //jdk8
        Arrays.stream(Gender.values()).forEach(e -> FROM_CODE_MAP.put(e.code, e));

        //上面一行代码对应的jdk7写法
//        for(Gender e : Gender.values()){
//            FROM_CODE_MAP.put(e.code, e);
//        }
    }

    Gender(String name, int code) {
        this.name = name;
        this.code = code;
    }

    public static Gender fromCode(Integer code){
        return fromCodeMap.get(code);
    }
    public static String getNameFromCode(Integer code){
        return fromCodeMap.get(code).name;
    }

}
```
```java
//@Data和@Builder使用lombok的注解，自动给类生成getter、setter方法和build
@Data
@Builder
public class Result<E> implements Serializable {
	private static final long serialVersionUID = -4578560278556203640L;
	
    private Integer code;
    private String msg;
    private E data;

    public static <T> Result<T> success(T data) {
        return Result.<T>builder().code(0).msg("OK").data(data).build();
    }

    public static <T> Result<T> success() {
        return Result.<T>builder().code(0).msg("OK").data(null).build();
    }

    public static <T> Result<T> error(ErrorResult errorResult) {
        return Result.<T>builder().code(errorResult.getCode()).msg(errorResult.getMessage()).data(null).build();
    }

    public static <T> Result<T> error(int code, String message) {
        return Result.<T>builder().code(code).msg(message).data(null).build();
    }
}

public enum  ErrorResult {
    /**
     * 错误类型
     */
    ILLEGAL_PARAMS(400, "illegal arguments"),
    INVALID_TOKEN(401, "invalid token"),

    private int code;
    private String message;

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    ErrorResult(int code, String message) {
        this.code = code;
        this.message = message;
    }

}
```
上面代码就是作用2、3点提及的枚举的工程应用，代码比较简单，不做解析。
## 枚举类字节码分析
先对枚举类基本的字节码做基本的分析，细节后面会慢慢提及，会尽量一步一步去介绍字节码，降低阅读难度。我们先来看一个最简单的枚举类：
```java
public enum Color{
    RED,
    BLUE;
}
```
编译成class文件之后，用javap解析字节码：javap -v Color.class，下面是完整的字节码，后面将逐一做分析。
```java
Classfile /D:/code/untitled/out/production/untitled/Color.class
  Last modified 2018-10-10; size 840 bytes
  MD5 checksum 57b2d489954a5f4eb4361793251c2f31
  Compiled from "Color.java"
public final class Color extends java.lang.Enum<Color>
  minor version: 0
  major version: 54
  flags: ACC_PUBLIC, ACC_FINAL, ACC_SUPER, ACC_ENUM
Constant pool:
   #1 = Fieldref           #4.#36         // Color.$VALUES:[LColor;
   #2 = Methodref          #37.#38        // "[LColor;".clone:()Ljava/lang/Object;
   #3 = Class              #17            // "[LColor;"
   #4 = Class              #39            // Color
   #5 = Methodref          #12.#40        // java/lang/Enum.valueOf:(Ljava/lang/Class;Ljava/lang/String;)Ljava/lang/Enum;
   #6 = Methodref          #12.#41        // java/lang/Enum."<init>":(Ljava/lang/String;I)V
   #7 = String             #13            // RED
   #8 = Methodref          #4.#41         // Color."<init>":(Ljava/lang/String;I)V
   #9 = Fieldref           #4.#42         // Color.RED:LColor;
  #10 = String             #15            // BLUE
  #11 = Fieldref           #4.#43         // Color.BLUE:LColor;
  #12 = Class              #44            // java/lang/Enum
  #13 = Utf8               RED
  #14 = Utf8               LColor;
  #15 = Utf8               BLUE
  #16 = Utf8               $VALUES
  #17 = Utf8               [LColor;
  #18 = Utf8               values
  #19 = Utf8               ()[LColor;
  #20 = Utf8               Code
  #21 = Utf8               LineNumberTable
  #22 = Utf8               valueOf
  #23 = Utf8               (Ljava/lang/String;)LColor;
  #24 = Utf8               LocalVariableTable
  #25 = Utf8               name
  #26 = Utf8               Ljava/lang/String;
  #27 = Utf8               <init>
  #28 = Utf8               (Ljava/lang/String;I)V
  #29 = Utf8               this
  #30 = Utf8               Signature
  #31 = Utf8               ()V
  #32 = Utf8               <clinit>
  #33 = Utf8               Ljava/lang/Enum<LColor;>;
  #34 = Utf8               SourceFile
  #35 = Utf8               Color.java
  #36 = NameAndType        #16:#17        // $VALUES:[LColor;
  #37 = Class              #17            // "[LColor;"
  #38 = NameAndType        #45:#46        // clone:()Ljava/lang/Object;
  #39 = Utf8               Color
  #40 = NameAndType        #22:#47        // valueOf:(Ljava/lang/Class;Ljava/lang/String;)Ljava/lang/Enum;
  #41 = NameAndType        #27:#28        // "<init>":(Ljava/lang/String;I)V
  #42 = NameAndType        #13:#14        // RED:LColor;
  #43 = NameAndType        #15:#14        // BLUE:LColor;
  #44 = Utf8               java/lang/Enum
  #45 = Utf8               clone
  #46 = Utf8               ()Ljava/lang/Object;
  #47 = Utf8               (Ljava/lang/Class;Ljava/lang/String;)Ljava/lang/Enum;
{
  public static final Color RED;
    descriptor: LColor;
    flags: ACC_PUBLIC, ACC_STATIC, ACC_FINAL, ACC_ENUM

  public static final Color BLUE;
    descriptor: LColor;
    flags: ACC_PUBLIC, ACC_STATIC, ACC_FINAL, ACC_ENUM

  public static Color[] values();
    descriptor: ()[LColor;
    flags: ACC_PUBLIC, ACC_STATIC
    Code:
      stack=1, locals=0, args_size=0
         0: getstatic     #1                  // Field $VALUES:[LColor;
         3: invokevirtual #2                  // Method "[LColor;".clone:()Ljava/lang/Object;
         6: checkcast     #3                  // class "[LColor;"
         9: areturn
      LineNumberTable:
        line 5: 0

  public static Color valueOf(java.lang.String);
    descriptor: (Ljava/lang/String;)LColor;
    flags: ACC_PUBLIC, ACC_STATIC
    Code:
      stack=2, locals=1, args_size=1
         0: ldc           #4                  // class Color
         2: aload_0
         3: invokestatic  #5                  // Method java/lang/Enum.valueOf:(Ljava/lang/Class;Ljava/lang/String;)Ljava/lang/Enum;
         6: checkcast     #4                  // class Color
         9: areturn
      LineNumberTable:
        line 5: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0      10     0  name   Ljava/lang/String;

  static {};
    descriptor: ()V
    flags: ACC_STATIC
    Code:
      stack=4, locals=0, args_size=0
         0: new           #4                  // class Color
         3: dup
         4: ldc           #7                  // String RED
         6: iconst_0
         7: invokespecial #8                  // Method "<init>":(Ljava/lang/String;I)V
        10: putstatic     #9                  // Field RED:LColor;
        13: new           #4                  // class Color
        16: dup
        17: ldc           #10                 // String BLUE
        19: iconst_1
        20: invokespecial #8                  // Method "<init>":(Ljava/lang/String;I)V
        23: putstatic     #11                 // Field BLUE:LColor;
        26: iconst_2
        27: anewarray     #4                  // class Color
        30: dup
        31: iconst_0
        32: getstatic     #9                  // Field RED:LColor;
        35: aastore
        36: dup
        37: iconst_1
        38: getstatic     #11                 // Field BLUE:LColor;
        41: aastore
        42: putstatic     #1                  // Field $VALUES:[LColor;
        45: return
      LineNumberTable:
        line 6: 0
        line 7: 13
        line 5: 26
}
Signature: #33                          // Ljava/lang/Enum<LColor;>;
SourceFile: "Color.java"
```
```java
public final class Color extends java.lang.Enum<Color>
```
可以看出枚举类是默认是继承了java.lang.Enum类，Java字节码格式并不禁止继承java.lang.Enum，但是javac编译器硬性不让你继承java.lang.Enum，Kotilin编译器是可以继承Enum的，如下图：
![Kotilin代码继承Enum](https://grandachn-1258245022.cos.ap-guangzhou.myqcloud.com/20181022155439646.png)

```java
public static final Color RED;
    descriptor: LColor;
    flags: ACC_PUBLIC, ACC_STATIC, ACC_FINAL, ACC_ENUM

public static final Color BLUE;
	descriptor: LColor;
	flags: ACC_PUBLIC, ACC_STATIC, ACC_FINAL, ACC_ENUM
```
枚举量RED和BLUE被编译成Color类的final类变量。
```java
public static Color[] values();
    descriptor: ()[LColor;
    flags: ACC_PUBLIC, ACC_STATIC
    Code:
      stack=1, locals=0, args_size=0
         0: getstatic     #1                  // Field $VALUES:[LColor;
         3: invokevirtual #2                  // Method "[LColor;".clone:()Ljava/lang/Object;
         6: checkcast     #3                  // class "[LColor;"
         9: areturn
      LineNumberTable:
        line 5: 0
```
values()用来返回定义的枚举量的数组，该方法由编译器生成，在java.lang.Enum类中都是找不到的。简单解释一下该方法的字节码：首先getstatic获取常量池中的Color[]变量，调用它的clone()方法返回一个java/lang/Object对象，checkcast #3（#3 对应常量池中的[LColor，[表示是数组，L表示是应用类型）检查java/lang/Object对象是否是Color[]对象，areturn从当前方法返回对象引用。至于这个常量池中的Color[]变量是怎么初始化的呢，下面继续看。
```java
 static {};
    descriptor: ()V
    flags: ACC_STATIC
    Code:
      stack=4, locals=0, args_size=0
         0: new           #4                  // class Color
         3: dup
         4: ldc           #7                  // String RED
         6: iconst_0
         7: invokespecial #8                  // Method "<init>":(Ljava/lang/String;I)V
        10: putstatic     #9                  // Field RED:LColor;
        13: new           #4                  // class Color
        16: dup
        17: ldc           #10                 // String BLUE
        19: iconst_1
        20: invokespecial #8                  // Method "<init>":(Ljava/lang/String;I)V
        23: putstatic     #11                 // Field BLUE:LColor;
        26: iconst_2
        27: anewarray     #4                  // class Color
        30: dup
        31: iconst_0
        32: getstatic     #9                  // Field RED:LColor;
        35: aastore
        36: dup
        37: iconst_1
        38: getstatic     #11                 // Field BLUE:LColor;
        41: aastore
        42: putstatic     #1                  // Field $VALUES:[LColor;
        45: return
      LineNumberTable:
        line 6: 0
        line 7: 13
        line 5: 26
```
上面是static代码块，会在一个类被加载时执行。从27行看起， anewarray   创建一个引用型（如类，接口，数组）的数组，并将其引用值压入栈顶，dup复制栈顶数值并将复制值压入栈顶 ，iconst_0将int型0推送至栈顶 ，getstatic 获取指定类的静态域，并将其值压入栈顶 ， aastore将栈顶引用型数值存入指定数组的指定索引位置。36到41行重复以上操作，42行putstatic为指定的类的静态域赋值，即将栈中的Color[]的引用赋值到Color类的静态域，最后return，也就完成了Color[]的初始化。

上面提及的栈是**栈帧**的**操作数栈**，JVM中一个线程会有一个对应的线程栈，线程栈中压入弹出的基本单位是栈帧，一个方法的调用，会让该方法对应的栈帧入栈，方法return，对应的栈帧出栈。其中，每个栈帧中会有一个自己的操作数栈，是用来存放jvm指令的操作数的。操作数栈的变化如下图:
![在这里插入图片描述](https://grandachn-1258245022.cos.ap-guangzhou.myqcloud.com/20181022164729149.png)
## values()方法和ordinal()方法
values()方法返回一个包含所有定义枚举量的数组，数组中枚举量的顺序和定义的先后顺序是一致的。values()方法在上一节中也详细分析过其字节码，故不再过多解释。ordinal()方法返回一个int的值，该值从0开始递增，反映了枚举量的定义顺序。如前文中的Color枚举类，Color.RED.ordinal()返回的是0， Color.BLUE.ordinal()返回的是1。
## 枚举类特性
### 1.支持定义方法，同时支持方法的重写（Override）
枚举类的字节码也是个普通的类，支持定义方法自然就不用说了。但是枚举类的字节码是被final修饰的，final修饰的类是不能被继承的，我们一般方法的重写是子类重写父类的方法，既然枚举不能被继承，那重写又是怎么实现的呢？我们先看代码：
```java
public enum Color {
    RED{
        @Override
        public void paint() {
            System.out.println("I am red");
        }
    },
    BLUE{
        @Override
        public void paint() {
            System.out.println("I am blue");
        }
    },
    DEFAULT;

    public void paint() {
        System.out.println("I am color");
    }

    public static void main(String[] args) {
        RED.paint();
        BLUE.paint();
        DEFAULT.paint();
    }
}
```
执行main()方法，输出如下：
```
I am red
I am blue
I am color
```
RED和BLUE不都是Color类的一个对象吗，怎么就可以重写方法了呢？ 这里不难猜到，RED和BLUE应该都是Color类的子类的实例，是子类对方法进行了重写，为了验证我们的猜想，我们看看编译的class文件。
![在这里插入图片描述](https://grandachn-1258245022.cos.ap-guangzhou.myqcloud.com/20181022172600150.png)
 熟悉匿名内部类的很容易就看出这个Color$1.class和Color$2.class是Color的匿名内部类了。
 我们反编译一下Color$1.class，如下：
```java
 Classfile /D:/code/javaTest/out/production/javaTest/Color$1.class
  Last modified 2018-10-22; size 576 bytes
  MD5 checksum 3c7b8ff46935f53c4e0a0bc0a6d935dc
  Compiled from "Color.java"
final class Color$1 extends Color
  minor version: 0
  major version: 52
  flags: ACC_FINAL, ACC_SUPER, ACC_ENUM
Constant pool:
   #1 = Methodref          #6.#20         // Color."<init>":(Ljava/lang/String;ILColor$1;)V
   #2 = Fieldref           #21.#22        // java/lang/System.out:Ljava/io/PrintStream;
   #3 = String             #23            // I am red
   #4 = Methodref          #24.#25        // java/io/PrintStream.println:(Ljava/lang/String;)V
   #5 = Class              #26            // Color$1
   #6 = Class              #27            // Color
   #7 = Utf8               <init>
   #8 = Utf8               (Ljava/lang/String;I)V
   #9 = Utf8               Code
  #10 = Utf8               LineNumberTable
  #11 = Utf8               LocalVariableTable
  #12 = Utf8               this
  #13 = Utf8               InnerClasses
  #14 = Utf8               LColor$1;
  #15 = Utf8               paint
  #16 = Utf8               ()V
  #17 = Utf8               SourceFile
  #18 = Utf8               Color.java
  #19 = Utf8               EnclosingMethod
  #20 = NameAndType        #7:#28         // "<init>":(Ljava/lang/String;ILColor$1;)V
  #21 = Class              #29            // java/lang/System
  #22 = NameAndType        #30:#31        // out:Ljava/io/PrintStream;
  #23 = Utf8               I am red
  #24 = Class              #32            // java/io/PrintStream
  #25 = NameAndType        #33:#34        // println:(Ljava/lang/String;)V
  #26 = Utf8               Color$1
  #27 = Utf8               Color
  #28 = Utf8               (Ljava/lang/String;ILColor$1;)V
  #29 = Utf8               java/lang/System
  #30 = Utf8               out
  #31 = Utf8               Ljava/io/PrintStream;
  #32 = Utf8               java/io/PrintStream
  #33 = Utf8               println
  #34 = Utf8               (Ljava/lang/String;)V
{
  Color$1(java.lang.String, int);
    descriptor: (Ljava/lang/String;I)V
    flags:
    Code:
      stack=4, locals=3, args_size=3
         0: aload_0
         1: aload_1
         2: iload_2
         3: aconst_null
         4: invokespecial #1                  // Method Color."<init>":(Ljava/lang/String;ILColor$1;)V
         7: return
      LineNumberTable:
        line 6: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       8     0  this   LColor$1;

  public void paint();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=1, args_size=1
         0: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
         3: ldc           #3                  // String I am red
         5: invokevirtual #4                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
         8: return
      LineNumberTable:
        line 9: 0
        line 10: 8
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       9     0  this   LColor$1;
}
SourceFile: "Color.java"
EnclosingMethod: #6.#0                  // Color
InnerClasses:
     static #5; //class Color$1
```
```java
final class Color$1 extends Color
```
 看来final修饰的类只是对开发者来说是不能继承的，编译器校验到继承了final类的时候会报错退出编译。对编译器生成的类来说，还是可以继承final类的。试了一下，将先编译子类，再将父类改成final，再编译父类，绕过了编译器的语法校验，执行时还是会报出如下运行时异常：
 ![在这里插入图片描述](https://grandachn-1258245022.cos.ap-guangzhou.myqcloud.com/20181022175337408.png)
看来在ClassLoader进行类加载的时候，还是会检查子类是否继承了final的父类，这里我猜想可能是对内部类继承final类放开了限制，要是我们编写这样的内部类的话直接就编译不了了，至于是不是如此就得看JVM的源码或者是暴力构建这样的类的字节码了。

这里再稍微提一下**匿名内部类**:
 1. 使用匿名内部类时，我们必须是继承一个类或者实现一个接口，但是两者不可兼得，同时也只能继承一个类或者实现一个接口。
 2. 匿名内部类中是不能定义构造函数的。
 3. 匿名内部类中不能存在任何的静态成员变量和静态方法。
 4. 匿名内部类为局部内部类，所以局部内部类的所有限制同样对匿名内部类生效。
 5. 匿名内部类不能是抽象的，它必须要实现继承的类或者实现的接口的所有抽象方法。
 
 
### 2.可实现接口，不可继承
前面提到，枚举类是默认继承了java.lang.Emum类的，Java语言是单继承的，所以枚举类自然就不能继承其他类了，但是枚举类是可以实现接口的，这带来的好处除了用接口去规范枚举类里面的方法，还能够用接口去组织枚举。
接口组织枚举类的参考代码如下：
```java
public interface Food {
    enum Appetizer implements Food{
        SALAD, SOUP, SPRING_ROLLS
    }
    enum Coffee implements Food{
        BLACK_COFFEE, TEA, LATTE
    }
    enum Dessert implements Food{
        FRUIT, GELATO, LASAGNE
    }
}
```

## name和ordinal
使用javap -v -p Color.class命令，带-v查看private方法，可以看到该Color枚举的构造方法如下：
```java
 private Color();
    descriptor: (Ljava/lang/String;I)V
    flags: ACC_PRIVATE
    Code:
      stack=3, locals=3, args_size=3
         0: aload_0
         1: aload_1
         2: iload_2
         3: invokespecial #6                  // Method java/lang/Enum."<init>":(Ljava/lang/String;I)V
         6: return
      LineNumberTable:
        line 5: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       7     0  this   LColor;
    Signature: #31                          // ()V
```
上面这段字节码转成java代码就是：
```java
private Color(String name, int ordinal){
	super(name, ordinal);
}
```
其实就是调用了java.lang.Enum类的构造方法，其构造方法如下
```java
/**
 * Sole constructor.  Programmers cannot invoke this constructor.
 * It is for use by code emitted by the compiler in response to
 * enum type declarations.
 *
 * @param name - The name of this enum constant, which is the identifier
 *               used to declare it.
 * @param ordinal - The ordinal of this enumeration constant (its position
 *         in the enum declaration, where the initial constant is assigned
 *         an ordinal of zero).
 */
protected Enum(String name, int ordinal) {
    this.name = name;
    this.ordinal = ordinal;
}
```
如注释里面说的,这个构造方法是不能被开发者调用的，这个方法是编译器在编译声明的枚举类的时候，会被编译器调用，这里的name默认是枚举类型的名称，ordinal从0开始递增。但是如果就是想改变这个name和ordinal的值，也是可以通过反射实现的。
```java
private Color(int ordinal, String name) {
     this.ordinal = ordinal;
     this.name = name;
     try {
         Field ordinalField = getClass().getSuperclass().getDeclaredField("ordinal");
         ordinalField.setAccessible(true);
         ordinalField.set(this, ordinal);
         ordinalField.setAccessible(false);

         Field nameField = getClass().getSuperclass().getDeclaredField("name");
         nameField.setAccessible(true);
         nameField.set(this, name);
         nameField.setAccessible(false);
     } catch (Exception e) {
     
     }
 }
```
## EnumSet和EnumMap
### 1. EnumSet替代位域
EnumSet是元素为枚举类的Set集合类，底层使用位域保存信息，速度比HashSet还要快。EnumSet是基于一个long类型的变量保存集合元素，一个long类型有64位（bit），每一个枚举元素需要1bit来表示该枚举元素是否处于EnumSet中。
```java
EnumSet.java
--------------------------------------

@SafeVarargs
public static <E extends Enum<E>> EnumSet<E> of(E first, E... rest) {
    EnumSet<E> result = noneOf(first.getDeclaringClass());
    result.add(first);
    for (E e : rest)
        result.add(e);
    return result;
}

public static <E extends Enum<E>> EnumSet<E> noneOf(Class<E> elementType) {
    Enum<?>[] universe = getUniverse(elementType);
    if (universe == null)
        throw new ClassCastException(elementType + " not an enum");

    if (universe.length <= 64)
        return new RegularEnumSet<>(elementType, universe);
    else
        return new JumboEnumSet<>(elementType, universe);
}
```
可以看出，当枚举类的枚举量少于64时，会使用RegularEnumSet，否则会使用JumboEnumSet，这两个类都是EnumSet的子类，我们简单地看一下这两个类。
```java
class RegularEnumSet<E extends Enum<E>> extends EnumSet<E> {
	/**
     * Bit vector representation of this set.  The 2^k bit indicates the
     * presence of universe[k] in this set.
     */
    private long elements = 0L;
    
	/**
     * Adds the specified element to this set if it is not already present.
     *
     * @param e element to be added to this set
     * @return <tt>true</tt> if the set changed as a result of the call
     *
     * @throws NullPointerException if <tt>e</tt> is null
     */
    public boolean add(E e) {
        typeCheck(e);

        long oldElements = elements;
        elements |= (1L << ((Enum<?>)e).ordinal());
        return elements != oldElements;
    }

    /**
     * Removes the specified element from this set if it is present.
     *
     * @param e element to be removed from this set, if present
     * @return <tt>true</tt> if the set contained the specified element
     */
    public boolean remove(Object e) {
        if (e == null)
            return false;
        Class<?> eClass = e.getClass();
        if (eClass != elementType && eClass.getSuperclass() != elementType)
            return false;

        long oldElements = elements;
        elements &= ~(1L << ((Enum<?>)e).ordinal());
        return elements != oldElements;
    }
}
```
RegularEnumSet是用一个long类型的变量elements来表示集合里的元素。添加元素关键代码：**elements |= (1L << ((Enum<?>)e).ordinal());** 删除元素关键代码： **elements &= ~(1L << ((Enum<?>)e).ordinal());**
```java
class JumboEnumSet<E extends Enum<E>> extends EnumSet<E> {
 /**
     * Bit vector representation of this set.  The ith bit of the jth
     * element of this array represents the  presence of universe[64*j +i]
     * in this set.
     */
    private long elements[];
}
```
JumboEnumSet只是用long类型的数组elements代替long类型的变量elements来保存数量超过64的枚举量，集合类操作具体的实现细节就不细说了。

### 2. EnumMap
如果Map的Key类型是枚举类型的话， 相比于HashMap，更推荐使用EnumMap。EnumMap的key只能是Enum类，底层实现是基于数组的。一般用于保存一个枚举类对应的额外的业务信息。下面简单看下其部分代码：
```java
public class EnumMap<K extends Enum<K>, V> extends AbstractMap<K, V>
    implements java.io.Serializable, Cloneable
{
    /**
     * The <tt>Class</tt> object for the enum type of all the keys of this map.
     *
     * @serial
     */
    private final Class<K> keyType;

    /**
     * All of the values comprising K.  (Cached for performance.)  
     * 这个数组对应枚举类的所有枚举量
     */
    private transient K[] keyUniverse;

    /**
     * Array representation of this map.  The ith element is the value
     * to which universe[i] is currently mapped, or null if it isn't
     * mapped to anything, or NULL if it's mapped to null.
     * 这里就是枚举量对应的value的值的存放的数组
     */
    private transient Object[] vals;

	public V put(K key, V value) {
        typeCheck(key);
		//用枚举量的ordinal值，作为vals数组的index，存放其对应value值
        int index = key.ordinal();
        Object oldValue = vals[index];
        vals[index] = maskNull(value);
        if (oldValue == null)
            size++;
        return unmaskNull(oldValue);
    }
}
```

## 单例模式的最佳实现：枚举
**饿汉式单例**：
```java
public class People{
	public static final People INSTANCE = new People();
	private People(){
	}
	public void eat(){
	}
}
```
**基于静态工厂方法的饿汉式单例**：
```java
public class People{
	private static final People INSTANCE = new People();
	private People(){
	}
	public static People getInstance(){
		return INSTANCE;
	}
	public void eat(){
	}
}
```
为了使以上实现的单例类变成可序列化的，仅仅在类的声明中添加“implements Serializable”是不够的。为了维护并保证单例，必须所有声明的实例变量都是transient的，并提供一个readResolve方法。否则，每次反序列化一个序列化的实例的时候，都会创建一个新的实例。
```java
private Object readResolve(){
	return INSTANCE;
}
```
对于一个正在被反序列化的对象，如果它的类定义了一个readResolve方法，并且具有正确的声明，那么在反序列化之后，新建对象上的readResolve方法就会被调用。然后，该方法返回的对象引用将被返回，取代新建的对象。

 **基于双检查锁机制的懒汉式单例**（线程安全）：
```java
public class People{  
    //使用volatile关键字保其可见性  
    volatile private static People INSTANCE = null;  
      
    private People (){}  
       
    public static People getInstance() {  
        try {    
	            if(INSTANCE == null){
	                synchronized (People.class) {  
	                    if(INSTANCE == null){//二次检查  
	                        INSTANCE = new People();  
	                    }   
		            }
	            }   
        } catch (InterruptedException e) {   
            e.printStackTrace();  
        }  
        return INSTANCE ;  
    }  
}  
```

 **基于静态内部类的懒汉式单例**（线程安全）：
```java
public class People{  
    //内部类  
    private static class PeopleHolder{  
        private static People instance = new People();  
    }   
    private People(){}  
       
    public static People getInstance() {   
        return PeopleHolder.instance;  
    }  
}  
```
这种使用内部类的懒汉式单例模式相比于双检查锁代码更加简洁易懂，借助JVM类加载时的锁机制（确保一个类类只会被同一ClassLoader加载一次），实现线程安全的、延迟加载的单例模式。
 

**基于枚举类的单例**：
```java
public enum People{
	INSTANCE;
	public void eat(){
	}
}
```
使用枚举实现单例将更加简洁，无偿地提供了序列化机制，绝对防止多次实例化，即使是在面对复杂的序列化或者反射攻击的时候。虽然这种方法还没有被广泛采用，但是**单元素的枚举类型已经成为实现Singleton的最佳方法**。

**基于静态工厂方法和枚举类单例**：
```java
public class People{
	public enum PeopleEnum{
		INSTANCE;
		private People instance;
		private PeopleEnum(){
            instance = new People();  
        }
        public People getInstance(){  
            return instance;  
        }  
	}
	private People(){
	}
	public static People getInstance(){
		return PeopleEnum.INSTANCE getInstance().;
	}
	public void eat(){
	}
}
```
个人觉得这么写虽然没有暴露内部实现，但是还不如直接写成前面的 **基于静态内部类的懒汉式单例**来的简洁，这样子使用枚举实现单例并没有体现出什么优势。

## 职责链模式的枚举实现
```java
public class Mail{
	String type;
	public Mail(String type){
		this.type = type;
	}
}
public class PostOffice{
    enum MailHandler{
        A{
            @Override
            boolean handle(Mail m){
                if (m.type == "A"){
                    System.out.println("A handle success");
                    return true;
                }else {
                    return false;
                }
            }
        },
        B{
            @Override
            boolean handle(Mail m){
                if (m.type == "B"){
                    System.out.println("B handle success");
                    return true;
                }else {
                    return false;
                }
            }
        },
        C{
            @Override
            boolean handle(Mail m){
                if (m.type == "C"){
                    System.out.println("C handle success");
                    return true;
                }else {
                    return false;
                }
            }
        };
        abstract boolean handle(Mail m);
    }

    static void handler(Mail m){
        for(MailHandler handler : MailHandler.values()){
            if (handler.handle(m)) {
                return;
            }

        }
        System.out.println("handle fail");
    }

    public static void main(String[] args) {
        Mail mailA = new Mail("A");
        Mail mailB = new Mail("B");
        Mail mailC = new Mail("C");
        Mail mailD = new Mail("D");

        handler(mailA);
        System.out.println("-----------");
        handler(mailB);
        System.out.println("-----------");
        handler(mailC);
        System.out.println("-----------");
        handler(mailD);
    }
}
```
上面的例子简化了《thinking in java》的例子，其运行的输出如下：
```
A handle success
-----------
B handle success
-----------
C handle success
-----------
handle fail
```
通常实现职责链模式是通过继承抽象类或者实现接口，链中每新增一个新的元素，就新建一个类，然后通过修改配置文件，或者修改代码将该类加入职责链中。Enum给职责链的实现提供了一个新的思路，链中新增一个元素只需要新增一个枚举量，但是也有一定的不足，使用Enum实现的职责链，链中元素不能被其他链复用自由组合，是否使用Enum去实现职责链还是要根据实际情况去取舍。