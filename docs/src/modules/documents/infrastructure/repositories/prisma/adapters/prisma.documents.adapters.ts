import { Prisma, Document } from '@prisma/client';
import { DocumentsResponse } from 'src/modules/documents/domain/schemas/dto/response/documents.response';

type DocumentWithRelations = Prisma.DocumentGetPayload<{
  include: {
    type_document: true;
    process: {
      include: {
        entity: true;
        status: {
          include: {
            type_status: true;
          };
        };
      };
    };
    status: {
      include: {
        type_status: true;
      };
    };
  };
}>;
export class PrismaDocumentsAdapter {
  static fromDocumentsModelToDocumentsResponse(
    document: DocumentWithRelations,
  ): DocumentsResponse {
    return {
      idDocument: document.id_document,
      name: document.name,
      description: document.description!,
      dateRequest: document.date_request!,
      dateReception: document.date_reception!,
      managerName: document.name_manager!,
      documentUrl: document.document_link!,
      status: {
        idStatus: document.status.id_status,
        name: document.status.name,
        description: document.status.description!,
        typeStatus: {
          idTypeStatus: document.status.type_status.id_type_status,
          name: document.status.type_status.name,
          description: document.status.type_status.description!,
          createdAt: document.status.type_status.created_at,
        },
        createdAt: document.status.created_at,
        updatedAt: document.status.updated_at,
      },
      typeDocument: {
        idTypeDocument: document.type_document.id_type_document,
        title: document.type_document.title,
        description: document.type_document.description!,
        createdAt: document.type_document.created_at,
        updatedAt: document.type_document.updated_at,
      },
      process: {
        idProcess: document.process.id_process,
        processNumber: document.process.process_number,
        value: Number(document.process.value),
        category: document.process.category,
        description: document.process.description!,
        timeExecution: document.process.time_execution,
        processObject: document.process.process_object,
        emailManager: document.process.email_manager!,
        fullNameManager: document.process.full_name_manager! ?? undefined,
        phoneManager: document.process.phone_manager! ?? undefined,
        statusProcess: document.process.id_status,
        isActive: document.process.is_active,
        entity: {
          idEntity: document.process.entity.id_entity,
          ruc: document.process.entity.ruc,
          name: document.process.entity.name,
          email: document.process.entity.email,
          cellphone: document.process.entity.cellphone,
          telephone: document.process.entity.telephone,
          address: document.process.entity.address,
          description: document.process.entity.description!,
          createdAt: document.process.entity.created_at,
          updatedAt: document.process.entity.updated_at,
        },
        status: {
          idStatus: document.process.status?.id_status!,
          name: document.process.status?.name!,
          description: document.process.status?.description!,
          typeStatus: {
            idTypeStatus: document.process.status?.type_status.id_type_status!,
            name: document.process.status?.type_status.name!,
            description: document.process.status?.type_status.description!,
            createdAt: document.process.status?.type_status.created_at!,
          },
          createdAt: document.process.status?.created_at!,
          updatedAt: document.process.status?.updated_at!,
        },
        createdAt: document.process.created_at,
        updatedAt: document.process.updated_at,
      },
    };
  }
}
