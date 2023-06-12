import { S3Client, GetObjectCommand, GetObjectCommandInput, GetObjectCommandOutput } from '@aws-sdk/client-s3'
import { WriteStream, createWriteStream } from 'node:fs'
import { Readable } from 'node:stream'
import express, {Express, Request, Response} from 'express'

const app: Express = express()

app.get('/', (req: Request, res: Response) => {
    res.send('hello')
})

app.listen(3000)

const s3Client = new S3Client({region: 'us-east-1'})
const input: GetObjectCommandInput = {
    Bucket: 'robbys-bucket',
    Key: 'miragea.mp4'
}
const command: GetObjectCommand = new GetObjectCommand(input)
try {
    const response: GetObjectCommandOutput = await s3Client.send(command)
    const myStream: Readable = response.Body as Readable
    // how to save to local file:
    //const writable: WriteStream = createWriteStream('file.mp4')
    //myStream.pipe(writable)

} catch (error) {
    console.log('error')
}
finally {
    console.log('finally')
}
