import { Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import { ApiOperation, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { PostModal } from './post.modal';
import { PostService } from './post.service';
import {Post1} from 'libs/db/src/schemas/post.schemas'
import {  ReturnModelType } from '@typegoose/typegoose';
import { IsNotEmpty } from 'class-validator'

class CreatePostsDto{
    
    @ApiPropertyOptional({description: '帖子的标题',required:true, example:'帖子标题'})
    @IsNotEmpty({message:'请填写标题'})
    title:string

    @ApiPropertyOptional({description: '帖子的内容', example:'帖子内容'})
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
    async create(@Body() createPostsDto :CreatePostsDto){
        await this.postModel.create(createPostsDto)
        return {
            success: true
        }
    }

    @Get(':id')
    @ApiOperation({summary:'帖子详情'})
    async detail(@Param('id') id: string){
        return await this.postModel.findById(id) 
    }

    @Put(':id')
    @ApiOperation({summary: '编辑帖子'})
    async update(@Param('id') id: string, @Body() updatePostsDto: CreatePostsDto){
        await this.postModel.findByIdAndUpdate(id, updatePostsDto)
        return{
          success: true
        }
    }

    @Delete(':id')
    @ApiOperation({summary: '删除帖子'})
    async remove(@Param('id') id: string){
        await this.postModel.findByIdAndDelete(id)
        return{
            success: true
        }
    } 
}
