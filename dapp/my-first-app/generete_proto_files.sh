#!/bin/bash
PROTO_DIR=./client/proto

# Generate Types
#npx proto-loader-gen-types --longs=String --enums=String \
#  --defaults --oneofs --grpcLib=@grpc/grpc-js \
#  --outDir=${PROTO_DIR} ../../Alphalink.WebApi.Core/Protos/*.proto
#
## Generate JS and TS code
#protoc -I=../../Alphalink.WebApi.Core/Protos ../../Alphalink.WebApi.Core/Protos/*.proto \
#  --js_out=import_style=commonjs,binary:${PROTO_DIR} \
#  --grpc-web_out=import_style=typescript,mode=grpcwebtext:${PROTO_DIR} \


mkdir -p ${PROTO_DIR}
npx protoc --ts_out ${PROTO_DIR} --proto_path ../../Alphalink.WebApi.Core/Protos ../../Alphalink.WebApi.Core/Protos/*.proto