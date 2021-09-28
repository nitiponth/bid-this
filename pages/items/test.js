import React, { Fragment, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { gql, useMutation } from "@apollo/client";
// import { filesQuery } from "./Files";

const UPLOAD_MU = gql`
  mutation ($singleUploadS3File: Upload!) {
    singleUploadS3(file: $singleUploadS3File) {
      filename
    }
  }
`;

function test() {
  const [uploadFile] = useMutation(UPLOAD_MU);
  const onDrop = useCallback(
    ([file]) => {
      uploadFile({ variables: { file } });
    },
    [uploadFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Fragment>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </Fragment>
  );
}

export default test;
