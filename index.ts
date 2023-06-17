import { S3Client, ListObjectsV2Command, ListObjectsV2CommandInput, ListObjectsV2CommandOutput, GetObjectCommand, GetObjectCommandInput, GetObjectCommandOutput } from '@aws-sdk/client-s3'
import { Readable } from 'node:stream'
import express, {Express, Request, Response} from 'express'

const app: Express = express()

app.get('/', async (req: Request, res: Response) => {
    const keys: string[] = []
    const s3Client: S3Client = new S3Client({region: 'us-east-1'})
    const input: ListObjectsV2CommandInput = {
        Bucket: 'robbys-bucket'
    }
    const command: ListObjectsV2Command = new ListObjectsV2Command(input)
    const response: ListObjectsV2CommandOutput = await s3Client.send(command)
    if (response.Contents)
        response.Contents.forEach(element => keys.push(element.Key!))
    res.send(keys)
})

app.get('/:objectID', async (req: Request, res: Response) => {
    const objectID: string = req.params.objectID
    const s3Client: S3Client = new S3Client({region: 'us-east-1'})
    const input: GetObjectCommandInput = {
        Bucket: 'robbys-bucket',
        Key: objectID
    }
    const command: GetObjectCommand = new GetObjectCommand(input)
    const response: GetObjectCommandOutput = await s3Client.send(command)
    const readStream = response.Body as Readable
    readStream.pipe(res)
})

app.listen(3000)