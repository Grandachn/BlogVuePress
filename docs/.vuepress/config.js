module.exports = {
  title: 'granda\'s blog',  // 设置网站标题
  description : '笔记',
  base : '/blog/grandachn/',
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
			{ text: 'Dubbo', link: '/Dubbo/' }
		  ] 
		},
		{ text: '算法题',
		  items: [
			{ text: 'LeetCode', link: '/LeetCode/' }
		  ] 
		},
		{ text: '关于', link: '/about/' },
		{ text: 'Github', link: 'https://www.github.com/grandachn' },
    ],
    sidebar: { 
		'/java/': [
			{
				title:'java语言',
				collapsable: true,
				children:[
					"Java枚举类"
				]
			}
			
        ],
    },
    sidebarDepth : 2
  },
  serviceWorker: true
}
