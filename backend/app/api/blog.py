from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Post, Category, Tag, Comment, User
from ..schemas import (
    PostCreate,
    Post as PostSchema,
    CategoryCreate,
    Category as CategorySchema,
    TagCreate,
    Tag as TagSchema,
    CommentCreate,
    Comment as CommentSchema
)
from ..deps import get_current_active_user

router = APIRouter()

# Post routes
@router.get("/posts", response_model=List[PostSchema])
async def get_posts(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    posts = db.query(Post).offset(skip).limit(limit).all()
    return posts

@router.post("/posts", response_model=PostSchema)
async def create_post(
    post: PostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_post = Post(
        **post.dict(),
        author_id=current_user.id
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@router.get("/posts/{post_id}", response_model=PostSchema)
async def get_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

# Category routes
@router.get("/categories", response_model=List[CategorySchema])
async def get_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).all()
    return categories

@router.post("/categories", response_model=CategorySchema)
async def create_category(
    category: CategoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_category = Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

# Tag routes
@router.get("/tags", response_model=List[TagSchema])
async def get_tags(db: Session = Depends(get_db)):
    tags = db.query(Tag).all()
    return tags

@router.post("/tags", response_model=TagSchema)
async def create_tag(
    tag: TagCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_tag = Tag(**tag.dict())
    db.add(db_tag)
    db.commit()
    db.refresh(db_tag)
    return db_tag

# Comment routes
@router.get("/posts/{post_id}/comments", response_model=List[CommentSchema])
async def get_post_comments(post_id: int, db: Session = Depends(get_db)):
    comments = db.query(Comment).filter(Comment.post_id == post_id).all()
    return comments

@router.post("/posts/{post_id}/comments", response_model=CommentSchema)
async def create_comment(
    post_id: int,
    comment: CommentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    post = db.query(Post).filter(Post.id == post_id).first()
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    
    db_comment = Comment(
        **comment.dict(),
        post_id=post_id,
        author_id=current_user.id
    )
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment 