import { Module } from "@nestjs/common";
import { PrismaModule } from "../prismaModule/prisma.module";

@Module({
    providers: [],
    exports: [],
    imports: [PrismaModule]
})
export class AuthModule {
    constructor() {}
}