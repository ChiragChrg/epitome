"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useEdgeStore } from '@/lib/edgestore';
import toast from 'react-hot-toast';
import useUserStore from '@/store/useUserStore';
import { LoaderCircleIcon, UploadCloudIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const RecieptUpload = () => {
    const [file, setFile] = useState<File>();
    const [previewUrl, setPreviewUrl] = useState<string>();
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter()
    const { edgestore } = useEdgeStore();
    const FileInputRef = useRef<HTMLInputElement>(null)
    const { user, setUser } = useUserStore()

    useEffect(() => {
        if (!file) {
            setPreviewUrl(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(file)
        setPreviewUrl(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    const HandleFileUpload = async () => {
        if (!file) return

        try {
            setIsLoading(true)
            const res = await edgestore.publicImages.upload({
                file,
                onProgressChange: (progress) => {
                    setUploadProgress(progress)
                },
            });
            // console.log("Upload Res", res)

            if (!res.url) {
                throw new Error()
            }

            const updateDB = await fetch("/api/post/upload-reciept", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user?.uid,
                    email: user?.email,
                    collegeName: user?.collegeName,
                    recieptUrl: res.url,
                    uploadAt: res.uploadedAt,
                }),
            });

            if (updateDB?.status === 201) {
                const data = await updateDB.json()
                toast.success(data.message)
                setUser(data.user)
                router.push(`./dashboard`)
            }
        } catch (err) {
            toast.error("Error while uploading image")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex flex-col mt-10 px-6'>
            <h3 className='text-[1.2em] font-bold'>Upload Payment Receipt</h3>

            <div
                className='mt-4 px-4 py-8 border border-dashed border-gray-400 rounded cursor-pointer'
                onClick={() => FileInputRef.current?.click()}
            >
                {file ? (
                    <Image
                        src={previewUrl ?? ''}
                        alt="Preview"
                        width={400}
                        height={400}
                        unoptimized
                        className='w-full h-auto max-w-xs'
                    />
                ) : (
                    <p className='text-center text-gray-500'>Click to select an image</p>
                )}
                <input
                    id="fileInput"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    ref={FileInputRef}
                    style={{ display: 'none' }}
                    onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        setFile(selectedFile);
                    }}
                />
            </div>

            <button
                className='flex_center gap-4 w-full md:w-[500px] self-center mt-4 px-4 py-2 bg-blue-500 text-white rounded'
                onClick={HandleFileUpload}>
                {!isLoading ?
                    <>
                        <UploadCloudIcon />
                        <span>Upload Reciept</span>
                    </>
                    :
                    <>
                        <LoaderCircleIcon className='animate-spin' />
                        <span>{Math.round(uploadProgress)}% Uploading Image</span>
                    </>
                }
            </button>
        </div>
    )
}

export default RecieptUpload