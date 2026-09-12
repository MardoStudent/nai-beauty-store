import { supabase } from '../supabaseClient';

export const uploadImage = async (file, folder = 'products') => {
  if (!supabase) throw new Error('Supabase n’est pas configuré.');

  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${folder}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from('images').upload(path, file, {
    cacheControl: '3600',
    contentType: file.type,
    upsert: false,
  });

  if (error) throw error;
  return supabase.storage.from('images').getPublicUrl(path).data.publicUrl;
};