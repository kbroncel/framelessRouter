var el = null;
function Router(){
    this.onRoute = function(){
        var url = location.hash.slice(1) || '/',
            route = this.routes[url],
            target = document.getElementById(route.targetId);

        if (route.templateUrl){
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function(){
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
                    (function(template){
                        if (target && template) {
                            target.innerHTML = template;
                        };
                    })(xmlHttp.responseText);
                };
            };
            
            xmlHttp.open("GET", route.templateUrl, true);
            xmlHttp.send(null);
        };
    };
    this.routes = {}
    this.registerRoute = function(path, templateUrl, targetId){
        this.routes[path] = {
            path: path,
            templateUrl: templateUrl,
            targetId: targetId
        };
    }
}

// example
var router = new Router();
router.registerRoute("/", "blank.html", "container");
router.registerRoute('history', 'history.html', "container");
window.addEventListener('hashchange', router.onRoute.bind(router));
window.addEventListener('load', router.onRoute.bind(router));