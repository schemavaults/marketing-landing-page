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
}

export function FullscreenImage({
  src,
  alt,
  width,
  height,
}: FullscreenImageProps) {
  const finalProps: FullscreenImageComponentProps<NextImageProps> = {
    src,
    alt,
    ImageComponent: Image,
    imageProps: {
      width,
      height,
    },
  };

  return <FullscreenImageComponent {...finalProps} />;
}

export default FullscreenImage;
