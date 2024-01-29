import * as path from 'path';
import { BadRequestException } from '@nestjs/common';

export const FileFilter = (allowedExtensions: string[]) => {
  return (req, file, callback) => {
    const extname = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(extname)) {
      callback(null, true);
    } else {
      const allowedExtensionsString = allowedExtensions.join(', ');
      callback(
        new BadRequestException(
          `Only the following file extensions are allowed: ${allowedExtensionsString}`,
        ),
        false,
      );
    }
  };
};
