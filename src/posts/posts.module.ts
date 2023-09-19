import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import {PostService} from './post.service'
import { DbModule } from 'y/db';
import { Post1 } from 'y/db/schemas/post.schemas';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ 
    DbModule.forRoot('MONGO_URI',{}),
    DbModule.forFeature([Post1])
  ],
  controllers: [PostsController],
  providers:[PostService]
})
export class PostsModule {

}
