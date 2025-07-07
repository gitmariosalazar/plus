import { Injectable } from '@nestjs/common';
import { InterfaceDocumentsRepository } from 'src/modules/documents/domain/contracts/documents.interface.repository';
import { DocumentsResponse } from 'src/modules/documents/domain/schemas/dto/response/documents.response';
import { DocumentsModel } from 'src/modules/documents/domain/schemas/model/documents.model';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { PrismaDocumentsAdapter } from '../adapters/prisma.documents.adapters';

@Injectable()
export class DocumentsPrismaImplementation
  implements InterfaceDocumentsRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(document: DocumentsModel): Promise<DocumentsResponse | null> {
    try {
      const createdDocument = await this.prismaService.document.create({
        data: {
          type_document: {
            connect: {
              id_type_document: document.getTypeDocument().getIdTypeDocument(),
            },
          },
          name: document.getDocumentName(),
          description: document.getDocumentDescription(),
          date_request: document.getDateRequest(),
          date_reception: document.getDateReception(),
          name_manager: document.getManagerName(),
          process: {
            connect: {
              id_process: document.getProcess().getIdProcess(),
            },
          },
          document_link: document.getDocumentUrl(),
          status: {
            connect: {
              id_status: document.getStatus().getIdStatus(),
            },
          },
        },
        include: {
          type_document: true,
          process: {
            include: {
              entity: true,
              status: {
                include: {
                  type_status: true,
                },
              },
            },
          },
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      return PrismaDocumentsAdapter.fromDocumentsModelToDocumentsResponse(
        createdDocument,
      );
    } catch (error) {
      throw error;
    }
  }

  async update(
    idDocument: number,
    document: DocumentsModel,
  ): Promise<DocumentsResponse | null> {
    try {
      const updatedDocument = await this.prismaService.document.update({
        where: { id_document: idDocument },
        data: {
          type_document: {
            connect: {
              id_type_document: document.getTypeDocument().getIdTypeDocument(),
            },
          },
          name: document.getDocumentName(),
          description: document.getDocumentDescription(),
          date_request: document.getDateRequest(),
          date_reception: document.getDateReception(),
          name_manager: document.getManagerName(),
          process: {
            connect: {
              id_process: document.getProcess().getIdProcess(),
            },
          },
          document_link: document.getDocumentUrl(),
          status: {
            connect: {
              id_status: document.getStatus().getIdStatus(),
            },
          },
        },
        include: {
          type_document: true,
          process: {
            include: {
              entity: true,
              status: {
                include: {
                  type_status: true,
                },
              },
            },
          },
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      return PrismaDocumentsAdapter.fromDocumentsModelToDocumentsResponse(
        updatedDocument,
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<DocumentsResponse[]> {
    try {
      const documents = await this.prismaService.document.findMany({
        include: {
          type_document: true,
          process: {
            include: {
              entity: true,
              status: {
                include: {
                  type_status: true,
                },
              },
            },
          },
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      return documents.map(
        PrismaDocumentsAdapter.fromDocumentsModelToDocumentsResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async findById(idDocument: number): Promise<DocumentsResponse | null> {
    try {
      const document = await this.prismaService.document.findUnique({
        where: { id_document: idDocument },
        include: {
          type_document: true,
          process: {
            include: {
              entity: true,
              status: {
                include: {
                  type_status: true,
                },
              },
            },
          },
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      if (!document) return null;

      return PrismaDocumentsAdapter.fromDocumentsModelToDocumentsResponse(
        document,
      );
    } catch (error) {
      throw error;
    }
  }

  async findByProcessId(idProcess: number): Promise<DocumentsResponse[]> {
    try {
      const documents = await this.prismaService.document.findMany({
        where: { process: { id_process: idProcess } },
        include: {
          type_document: true,
          process: {
            include: {
              entity: true,
              status: {
                include: {
                  type_status: true,
                },
              },
            },
          },
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      return documents.map(
        PrismaDocumentsAdapter.fromDocumentsModelToDocumentsResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async findByStatusId(idStatus: number): Promise<DocumentsResponse[]> {
    try {
      const documents = await this.prismaService.document.findMany({
        where: { status: { id_status: idStatus } },
        include: {
          type_document: true,
          process: {
            include: {
              entity: true,
              status: {
                include: {
                  type_status: true,
                },
              },
            },
          },
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      return documents.map(
        PrismaDocumentsAdapter.fromDocumentsModelToDocumentsResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async findByTypeDocumentId(
    idTypeDocument: number,
  ): Promise<DocumentsResponse[]> {
    try {
      const documents = await this.prismaService.document.findMany({
        where: { type_document: { id_type_document: idTypeDocument } },
        include: {
          type_document: true,
          process: {
            include: {
              entity: true,
              status: {
                include: {
                  type_status: true,
                },
              },
            },
          },
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      return documents.map(
        PrismaDocumentsAdapter.fromDocumentsModelToDocumentsResponse,
      );
    } catch (error) {
      throw error;
    }
  }

  async delete(idDocument: number): Promise<boolean> {
    try {
      const deletedDocument = await this.prismaService.document.delete({
        where: { id_document: idDocument },
      });
      return !!deletedDocument;
    } catch (error) {
      throw error;
    }
  }

  async existsById(idDocument: number): Promise<boolean> {
    try {
      const document = await this.prismaService.document.findUnique({
        where: { id_document: idDocument },
      });
      return !!document;
    } catch (error) {
      throw error;
    }
  }
}
