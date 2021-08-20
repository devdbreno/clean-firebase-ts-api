import { nanoid } from 'nanoid/async'

export class MemoryStorage<TDocument extends { id: string }> {
  private readonly data = {
    [this.collection]: new Map<string, TDocument>()
  }

  constructor(private readonly collection: string) {}

  public async add(input: Omit<TDocument, 'id'>): Promise<TDocument> {
    const document = { ...input } as TDocument

    if (document.id === undefined) {
      document.id = await nanoid()
    }

    Promise.resolve(this.data[this.collection].set(document.id, document))

    return Promise.resolve(document)
  }

  public async set(id: string, input: Partial<TDocument>): Promise<void> {
    const documentOrUndefined = this.data[this.collection].get(id)

    if (documentOrUndefined !== undefined) {
      this.data[this.collection].set(id, { input, ...documentOrUndefined })
    }

    return Promise.resolve()
  }

  public async find(): Promise<TDocument[]> {
    const documents: TDocument[] = []

    for (const document of this.data[this.collection].values()) {
      documents.push(document)
    }

    return Promise.resolve(documents)
  }

  public async findById(documentId: string): Promise<TDocument> {
    for (const [id, document] of this.data[this.collection].entries()) {
      if (documentId === id) {
        return document
      }
    }
    throw new Error('Method not implemented.')
  }
}
