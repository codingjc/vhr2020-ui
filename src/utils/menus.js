import {getRequest} from "./api";

export const initMenu=(router, store)=>{
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest("/system/config/menu").then(data => {
        if(data) {
            let fmtRoutes = formatRoutes(data);
            router.addRoutes(fmtRoutes);
            store.commit('initRoutes', fmtRoutes);
        }
    })
};

export const formatRoutes = (routes) => {
    let fmRoutes = [];
    routes.forEach(router => {
        let{
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;

        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }

        let fmRoute = {
            path: path,
            name: name,
            meta: meta,
            iconCls: iconCls,
            children: children,
            component(resolve) {
                if (name.startWith("Emp")) {
                    require(['../views/emp/' + component + '.vue'], resolve);
                } else if(name.startWith("Per")) {
                    require(['../views/per/' + component + '.vue'], resolve);
                }else if(name.startWith("Sal")) {
                    require(['../views/ser/' + component + '.vue'], resolve);
                }else if(name.startWith("Sta")) {
                    require(['../views/sta/' + component + '.vue'], resolve);
                }else if(name.startWith("Sys")) {
                    require(['../views/sys/' + component + '.vue'], resolve);
                } else {
                    require(['../views/' + component + '.vue'], resolve);
                }
            }
        }
        fmRoute.push(fmRoute);
    });

    return fmRoutes;
};