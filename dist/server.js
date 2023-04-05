"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _app = _interopRequireDefault(require("./app"));
const _authRoute = _interopRequireDefault(require("./routes/auth.route"));
const _indexRoute = _interopRequireDefault(require("./routes/index.route"));
const _usersRoute = _interopRequireDefault(require("./routes/users.route"));
const _validateEnv = _interopRequireDefault(require("./utils/validateEnv"));
const _spmgtinblocksRoutes = _interopRequireDefault(require("./routes/SPMGTINBlocks.routes"));
const _articleRoutes = _interopRequireDefault(require("./routes/article.routes"));
const _modelGroupRoutes = _interopRequireDefault(require("./routes/modelGroup.routes"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
(0, _validateEnv.default)();
const app = new _app.default([
    new _indexRoute.default(),
    new _usersRoute.default(),
    new _authRoute.default(),
    new _spmgtinblocksRoutes.default(),
    new _articleRoutes.default(),
    new _modelGroupRoutes.default()
]);
app.listen();

//# sourceMappingURL=server.js.map