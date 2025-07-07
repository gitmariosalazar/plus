import { Injectable } from '@nestjs/common';
import { InterfaceProcessDocumentRepository } from 'src/modules/process-docs/domain/contracts/process-document.interface.repository';
import { ProcessDocumentResponse } from 'src/modules/process-docs/domain/schemas/dto/response/process-document.response';
import { ProcessDocumentModel } from 'src/modules/process-docs/domain/schemas/model/process-document.model';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { PrismaProcessDocumentAdapter } from '../adapters/prisma.process-document.adapter';

@Injectable()
export class ProcessDocumentPrismaImplementation
  implements InterfaceProcessDocumentRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    processDocument: ProcessDocumentModel,
  ): Promise<ProcessDocumentResponse | null> {
    try {
      const createdProcessDocument =
        await this.prismaService.processDocuments.create({
          data: {
            process_code: processDocument.getProcess().getIdProcess(),
            id_document: processDocument.getDocument().getIdDocument(),
            observations: processDocument.getObservations(),
          },
          include: {
            process: {
              include: {
                status: {
                  include: {
                    type_status: true,
                  },
                },
                entity: true,
              },
            },
            document: {
              include: {
                type_document: true,
                status: {
                  include: {
                    type_status: true,
                  },
                },
              },
            },
          },
        });

      return PrismaProcessDocumentAdapter.fromProcessDocumentsModelToResponse(
        createdProcessDocument,
      );
    } catch (error) {
      throw error;
    }
  }

  async update(
    idProcessDocument: number,
    processDocument: ProcessDocumentModel,
  ): Promise<ProcessDocumentResponse | null> {
    try {
      const updatedProcessDocument =
        await this.prismaService.processDocuments.update({
          where: { id_process_document: idProcessDocument },
          data: {
            process_code: processDocument.getProcess().getIdProcess(),
            id_document: processDocument.getDocument().getIdDocument(),
            observations: processDocument.getObservations(),
          },
          include: {
            process: {
              include: {
                status: {
                  include: {
                    type_status: true,
                  },
                },
                entity: true,
              },
            },
            document: {
              include: {
                type_document: true,
                status: {
                  include: {
                    type_status: true,
                  },
                },
              },
            },
          },
        });

      return PrismaProcessDocumentAdapter.fromProcessDocumentsModelToResponse(
        updatedProcessDocument,
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ProcessDocumentResponse[]> {
    try {
      const processDocuments =
        await this.prismaService.processDocuments.findMany({
          include: {
            process: {
              include: {
                status: {
                  include: {
                    type_status: true,
                  },
                },
                entity: true,
              },
            },
            document: {
              include: {
                type_document: true,
                status: {
                  include: {
                    type_status: true,
                  },
                },
              },
            },
          },
        });

      return processDocuments.map((processDocument) =>
        PrismaProcessDocumentAdapter.fromProcessDocumentsModelToResponse(
          processDocument,
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  async findByDocumentId(
    idDocument: number,
  ): Promise<ProcessDocumentResponse[]> {
    try {
      const processDocuments =
        await this.prismaService.processDocuments.findMany({
          where: { id_document: idDocument },
          include: {
            process: {
              include: {
                status: {
                  include: {
                    type_status: true,
                  },
                },
                entity: true,
              },
            },
            document: {
              include: {
                type_document: true,
                status: {
                  include: {
                    type_status: true,
                  },
                },
              },
            },
          },
        });

      return processDocuments.map((processDocument) =>
        PrismaProcessDocumentAdapter.fromProcessDocumentsModelToResponse(
          processDocument,
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  async findById(
    idProcessDocument: number,
  ): Promise<ProcessDocumentResponse | null> {
    try {
      const processDocument =
        await this.prismaService.processDocuments.findUnique({
          where: { id_process_document: idProcessDocument },
          include: {
            process: {
              include: {
                status: {
                  include: {
                    type_status: true,
                  },
                },
                entity: true,
              },
            },
            document: {
              include: {
                type_document: true,
                status: {
                  include: {
                    type_status: true,
                  },
                },
              },
            },
          },
        });

      if (!processDocument) return null;

      return PrismaProcessDocumentAdapter.fromProcessDocumentsModelToResponse(
        processDocument,
      );
    } catch (error) {
      throw error;
    }
  }

  async findByProcessId(idProcess: number): Promise<ProcessDocumentResponse[]> {
    try {
      const processDocuments =
        await this.prismaService.processDocuments.findMany({
          where: { process_code: idProcess },
          include: {
            process: {
              include: {
                status: {
                  include: {
                    type_status: true,
                  },
                },
                entity: true,
              },
            },
            document: {
              include: {
                type_document: true,
                status: {
                  include: {
                    type_status: true,
                  },
                },
              },
            },
          },
        });

      return processDocuments.map((processDocument) =>
        PrismaProcessDocumentAdapter.fromProcessDocumentsModelToResponse(
          processDocument,
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  async delete(idProcessDocument: number): Promise<boolean> {
    try {
      const deletedProcessDocument =
        await this.prismaService.processDocuments.delete({
          where: { id_process_document: idProcessDocument },
        });
      return !!deletedProcessDocument;
    } catch (error) {
      throw error;
    }
  }

  async existsById(idProcessDocument: number): Promise<boolean> {
    try {
      const processDocument =
        await this.prismaService.processDocuments.findUnique({
          where: { id_process_document: idProcessDocument },
        });
      return !!processDocument;
    } catch (error) {
      throw error;
    }
  }
}
