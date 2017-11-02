var routers = [{
    path: '/',
    redirect: '/index',
    component: require('./layout.vue'),
    children: [{
        path: 'index',
        component: require('./index.vue'),
        children: [
            {
                path: '/',
                component: require('./form.vue')
            },
            {
                path: '/index2',
                component: require('./form2.vue')
            },
        ]
    }, {
        path: 'other',
        component: require('./other.vue'),
        redirect: 'other/others',
        children: [
            {
                path: 'others',
                component: require('./form3.vue')
            },
        ]
    }],
}];
module.exports = routers;
