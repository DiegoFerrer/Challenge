import { HttpModule, Module } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils/utils.service';

@Module({
    imports:[
        HttpModule
    ],
    providers: [
        UtilsService
    ],
    exports:[
        UtilsService
    ]
})
export class SharedModule {}
