<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'date' => $this->resource->date,
            'person_count' => $this->resource->person_count,
            'user' => new UserResource($this->resource->user),
            'exhibition' => new ExhibitionResource($this->resource->exhibition),
        ];
    }
}
