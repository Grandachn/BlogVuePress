module.exports = {
  title: 'granda\'s blog',  // 设置网站标题
  description : '笔记',
  themeConfig : {
    nav : [
        { text: '主页', link: '/' },
		{ text: '编程语言',
		  items: [
			{ text: 'Java', link: '/java/' }
		  ] 
		},
		{ text: '开源框架',
		  items: [
			{ text: 'dubbo', link: '/dubbo/' },
			{ text: 'docker', link: '/docker/' }
		  ] 
		},
		{ text: '算法题',
		  items: [
			{ text: 'leetCode', link: '/leetCode/' }
		  ] 
		},
		{ text: '关于', link: '/about/' },
		{ text: 'Github', link: 'https://www.github.com/grandachn' },
    ],
    sidebar: { 
		'/java/': [
			{
				title:'Java语言',
				collapsable: true,
				children:[
					"Java枚举类"
				]
			},
			{
				title:'JVM',
				collapsable: true,
				children:[
					""
				]
			}
			
        ],
		'/leetCode/': [
			{
				title:'算法题',
				children:[
					"1",
					"2"
				]
			}
		],
		'/docker/': [
			{
				title:'使用手册',
				children:[
					"Docker基本操作"
				]
			}
		],
		'/dubbo/': [
			{
				title:'框架使用',
				collapsable: true,
				children:[
					"Dubbo的一个demo",
				]
			},
			{
				title:'源码分析',
				collapsable: true,
				children:[
					"四种负载均衡",
				]
			}
			
		]
    },
    sidebarDepth : 2
  },
  serviceWorker: true
}
