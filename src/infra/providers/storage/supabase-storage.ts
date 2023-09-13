import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { FileDTO } from 'src/modules/users/dto/user.dto';
import { IStorage } from './storage';

@Injectable()
export class SupabaseStorage implements IStorage {
  private client: SupabaseClient;
  constructor() {
    this.client = new SupabaseClient(
      process.env.SUPABASE_URL ?? '',
      process.env.SUPABASE_KEY ?? '',
    );
  }

  async upload(file: FileDTO, folder: string): Promise<any> {
    const { data, error } = await this.client.storage
      .from(process.env.SUPABASE_BUCKET ?? '')
      .upload(`${folder}/${file.originalname}`, file.buffer, { upsert: true });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
