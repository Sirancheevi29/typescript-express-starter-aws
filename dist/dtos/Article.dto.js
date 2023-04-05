"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateArtcile", {
    enumerable: true,
    get: ()=>CreateArtcile
});
const _classValidator = require("class-validator");
var __decorate = (void 0) && (void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (void 0) && (void 0).__metadata || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let CreateArtcile = class CreateArtcile {
};
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateArtcile.prototype, "an_initial_assignment_date", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateArtcile.prototype, "an_status", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateArtcile.prototype, "an_source_system", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateArtcile.prototype, "an_distribution_comment", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateArtcile.prototype, "an_distribution_date", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateArtcile.prototype, "an_group", void 0);

//# sourceMappingURL=Article.dto.js.map