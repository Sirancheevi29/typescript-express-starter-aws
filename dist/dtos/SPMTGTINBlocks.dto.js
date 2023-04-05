"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateSPMGTINBlocks", {
    enumerable: true,
    get: ()=>CreateSPMGTINBlocks
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
let CreateSPMGTINBlocks = class CreateSPMGTINBlocks {
};
__decorate([
    (0, _classValidator.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSPMGTINBlocks.prototype, "blockExplosion", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateSPMGTINBlocks.prototype, "relatedGS1Organization", void 0);
__decorate([
    (0, _classValidator.IsDateString)(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateSPMGTINBlocks.prototype, "updateDate", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateSPMGTINBlocks.prototype, "barcodeAssignee", void 0);
__decorate([
    (0, _classValidator.IsDateString)(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateSPMGTINBlocks.prototype, "blockExplosionDate", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateSPMGTINBlocks.prototype, "countryCode", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateSPMGTINBlocks.prototype, "ean128Receiver", void 0);
__decorate([
    (0, _classValidator.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSPMGTINBlocks.prototype, "blockUsedForEAN128Assignment", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateSPMGTINBlocks.prototype, "gtinBlock", void 0);
__decorate([
    (0, _classValidator.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSPMGTINBlocks.prototype, "blockUsedForGLNAssignment", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateSPMGTINBlocks.prototype, "gs1ContactEmailAddress", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateSPMGTINBlocks.prototype, "parentGLN", void 0);
__decorate([
    (0, _classValidator.IsDateString)(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateSPMGTINBlocks.prototype, "createDate", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateSPMGTINBlocks.prototype, "iamBarcodePoolId", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateSPMGTINBlocks.prototype, "comment", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateSPMGTINBlocks.prototype, "adidasGroupContact", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateSPMGTINBlocks.prototype, "ean128Contact", void 0);
__decorate([
    (0, _classValidator.IsDateString)(),
    __metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateSPMGTINBlocks.prototype, "blockPurchaseDate", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateSPMGTINBlocks.prototype, "blockId", void 0);
__decorate([
    (0, _classValidator.IsString)(),
    __metadata("design:type", String)
], CreateSPMGTINBlocks.prototype, "gtinType", void 0);

//# sourceMappingURL=SPMTGTINBlocks.dto.js.map