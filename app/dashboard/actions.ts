'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createCompanion(prevState: any, formData: FormData) {
    const supabase = createClient()

    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const avatar_url = formData.get('avatar_url') as string
    const tags = (formData.get('tags') as string)?.split(',').map(t => t.trim()) || []

    if (!name || !description || !avatar_url) {
        return { message: 'Missing required fields' }
    }

    try {
        const { error } = await supabase.from('companions').insert({
            name,
            description,
            avatar_url,
            tags,
            is_online: true, // Default to online for new creations
            personality_model: 'generic'
        })

        if (error) {
            console.error('Supabase error:', error)
            return { message: 'Failed to create companion: ' + error.message }
        }

        revalidatePath('/dashboard')
        return { message: 'success' }
    } catch (e) {
        return { message: 'Unexpected error' }
    }
}
