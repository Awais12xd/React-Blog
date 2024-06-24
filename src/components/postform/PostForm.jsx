import "./postform.css";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import Input from "../input/Input";
import RTE from "../RTE";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Service from "../../appwrite/config";
import Select from '../Select/Select'

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData)

  const submit = async (data) => {
    try {
      if (post) {
        const file = data.image[0]
          ? await Service.uploadFile(data.image[0])
          : null;
        if (file) {
          Service.deleteFile(post.image);
        }
        const dbPost = await Service.updatePost(post.$id, {
          ...data,
          image: file ? file.$id : undefined,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await Service.uploadFile(data.image[0]);
        if (file) {
          const fileId = file.$id;
          data.image = fileId;
          console.log(userData)
          
          const dbPost = await Service.createPost({
            ...data,
            userId: userData.$id,
            
          });
          if(dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.log("Submit" , error)
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);
  ////////////////////

  return (
    <>
      <form className="formm" onSubmit={handleSubmit(submit)}>
        <p>POSTFORM</p>
        <h1>Write Complte Details</h1>
        <Input classes="input"
          label="Title:      "
          placeholder="Title"
          {...register("title", { required: true })}
        />
        <Input classes="input"
          label="Slug: "
          placeholder="Slug"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <div className="RTE">
        <RTE
         label="Content: "
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
        </div>
        <Input classes="input"
          label="Featured Image: "
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div classes="">
            <img
              src={appwriteService.getFilePreview(post.image)}
              alt={post.title}
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          
          {...register("status", { required: true })}
        />
        <button type="submit" >
      {post? "Update":"Submit"}
        </button>
      </form>
    </>
  );
}

export default PostForm;
