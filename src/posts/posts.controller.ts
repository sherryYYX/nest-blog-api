import { Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import { ApiOperation, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { PostModal } from './post.modal';
import { PostService } from './post.service';
import {Post1} from 'libs/db/src/schemas/post.schemas'
import {  ReturnModelType } from '@typegoose/typegoose';

class CreatePostsDto{
    
    @ApiPropertyOptional({description: '帖子的标题',required:true})
    title:string

    @ApiPropertyOptional({description: '帖子的内容'})
    content: string 
}

@Controller('posts')
@ApiTags('帖子')

export class PostsController {
    constructor(
        private postService: PostService, 
        @Inject(Post1.name) private readonly postModel: ReturnModelType<typeof Post1>){}

    @Get()
    @ApiOperation({summary:'帖子列表'})
    async getList(){
        return await this.postModel.find()
    }
    
    @Post()
    @ApiOperation({summary: '创建帖子'})
    create(@Body() body:CreatePostsDto){
        return body
    }

    @Get(':id')
    @ApiOperation({summary:'帖子详情'})
    detail(@Param('id') id: string){
        return{
            id,
            title: '文章1'
        }
    }

    @Put(':id')
    @ApiOperation({summary: '编辑帖子'})
    update(@Param('id') id: string, @Body() body: CreatePostsDto){
        return{
            id,
            ...body
        }
    }

    @Delete('id')
    @ApiOperation({summary: '删除帖子'})
    remove(@Param('id') id: string){
        return{
            success: true
        }
    } 
}
