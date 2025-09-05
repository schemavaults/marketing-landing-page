"use client";

import {
  FullscreenImage as FullscreenImageComponent,
  FullscreenImageProps as FullscreenImageComponentProps,
} from "@schemavaults/ui";
import Image, { type ImageProps } from "next/image";

type NextImageProps = Omit<ImageProps, "src"> & { src: string };

export interface FullscreenImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function FullscreenImage({
  src,
  alt,
  width,
  height,
  className,
}: FullscreenImageProps) {
  const finalProps: FullscreenImageComponentProps<NextImageProps> = {
    src,
    alt,
    ImageComponent: Image,
    imageProps: {
      width,
      height,
      className,
    },
    fullscreenImageProps: {
      fill: true,
      className: "w-full h-full object-contain",
    },
    fullscreenContainerClassName: "h-full w-full",
  };

  return <FullscreenImageComponent {...finalProps} />;
}

export default FullscreenImage;
